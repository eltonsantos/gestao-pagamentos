import { FaHome, FaUser, FaMoneyBillWave, FaUsers } from 'react-icons/fa';

export function Sidebar() {
  return (
    <div className="text-slate-600  bg-white w-60 p-6 flex flex-col border-2 border-r-orange-300 text-3xl">
      <nav className="flex flex-col space-y-4">
        <a href="#" className="flex items-center space-x-2 hover:text-orange-600">
          <FaHome />
          <span>Home</span>
        </a>
        <a href="#" className="flex items-center space-x-2 hover:text-orange-600">
          <FaUser />
          <span>Users</span>
        </a>
        <a href="#" className="flex items-center space-x-2 hover:text-orange-600">
          <FaMoneyBillWave />
          <span>Comissões</span>
        </a>
        <a href="#" className="flex items-center space-x-2 hover:text-orange-600">
          <FaUsers />
          <span>Customers</span>
        </a>
      </nav>
    </div>
  );
}