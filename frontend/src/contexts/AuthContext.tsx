import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from "../services/api"

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('jwt_token');
  });
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    return localStorage.getItem('user_email');
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      setIsAuthenticated(true);
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/login', {
        user: {
          email: email,
          password: password
        }
      });

      if (response.data?.status?.data?.token) {
        const { token, user } = response.data.status.data;
        
        localStorage.setItem('jwt_token', token);
        localStorage.setItem('user_email', user.email);

        setIsAuthenticated(true);
        setUserEmail(user.email);
  
        api.defaults.headers.Authorization = `Bearer ${token}`;
  
        navigate('/');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login falhou:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_email');
    setIsAuthenticated(false);
    setUserEmail(null);
    api.defaults.headers.Authorization = '';
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};