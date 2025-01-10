import { Link } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa';
import { MdPayments } from "react-icons/md";
import { GrMoney } from "react-icons/gr";
import { useEffect, useState } from 'react';
import { api } from '../services/api';

export function Sidebar() {
  const [userRole, setUserRole] = useState<number | string>("admin");

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const response = await api.get('/users/current');
        console.log("Role: ", userRole)
        setUserRole(response.data.role);
      } catch (error) {
        console.error('Erro ao verificar papel do usuário:', error);
      }
    };
    checkUserRole();
  }, []);

  return (
    <div className="text-slate-600 bg-white w-80 p-6 flex flex-col border-2 border-r-orange-300 text-3xl">
      <nav className="flex flex-col space-y-4">
        <Link to="/" className="flex items-center space-x-2 hover:text-orange-600">
          <MdPayments />
          <span>Home</span>
        </Link>
        {userRole === "admin" && (
          <>
            <Link to="/sellers" className="flex items-center space-x-2 hover:text-orange-600">
              <FaUsers />
              <span>Vendedores</span>
            </Link>
            <Link to="/checkout" className="flex items-center space-x-2 hover:text-orange-600">
              <GrMoney />
              <span>Efetuar Venda</span>
            </Link>
          </>
        )}
        <Link to="/payments" className="flex items-center space-x-2 hover:text-orange-600">
          <MdPayments />
          <span>Pagamentos</span>
        </Link>
      </nav>
    </div>
  );
}