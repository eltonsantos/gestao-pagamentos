/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from "../services/api"
import { toast } from 'react-toastify';

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  isAdmin: boolean;
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
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      setIsAuthenticated(true);
      api.defaults.headers.Authorization = `Bearer ${token}`;

      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setIsAdmin(decodedToken.role === 'admin');
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

        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setIsAdmin(decodedToken.role === 'admin');
  
        api.defaults.headers.Authorization = `Bearer ${token}`;
  
        navigate('/');
        toast.success("Logado com sucesso!");
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Login falhou:', error);
      toast.error('Login falhou:', error)
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_email');
    setIsAuthenticated(false);
    setUserEmail(null);
    setIsAdmin(false);
    api.defaults.headers.Authorization = '';
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, isAdmin, login, logout }}>
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