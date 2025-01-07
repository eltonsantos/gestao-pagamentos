import { FaMoneyBillWave } from "react-icons/fa";

export function Header() {
  return (
    <header className="bg-orange-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg text-center align-middle flex gap-2">
        <FaMoneyBillWave className="text-2xl" />
        Gestão de Pagamentos
      </h1>
      <div>
        <span className="mr-4">Olá, Usuário</span>
        <button className="bg-white text-orange-600 px-4 py-2 rounded">Logout</button>
      </div>
    </header>
  );
}