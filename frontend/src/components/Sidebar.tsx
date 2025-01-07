import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaMoneyBillWave, FaUsers } from 'react-icons/fa';

export function Sidebar() {
  return (
    <div className="text-slate-600  bg-white w-72 p-6 flex flex-col border-2 border-r-orange-300 text-3xl">
      <nav className="flex flex-col space-y-4">
        <Link to="/" className="flex items-center space-x-2 hover:text-orange-600">
          <FaHome />
          <span>Home</span>
        </Link>
        <Link to="/" className="flex items-center space-x-2 hover:text-orange-600">
          <FaUser />
          <span>Vendedor</span>
        </Link>
        <Link to="/checkout" className="flex items-center space-x-2 hover:text-orange-600">
          <FaMoneyBillWave />
          <span>Efetuar Venda</span>
        </Link>
        <Link to="/payments" className="flex items-center space-x-2 hover:text-orange-600">
          <FaUsers />
          <span>Pagamentos</span>
        </Link>
      </nav>
    </div>
  );
}