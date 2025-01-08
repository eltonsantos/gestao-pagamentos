import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

export function Dashboard() {
  const mockSellers = [
    {
      id: "1",
      name: "Elton Santos",
      email: "elton@elton.com",
      commission: 200,
    },
    { id: "2", name: "Ericson Melo", email: "eric@eric.com", commission: 250 },
    { id: "3", name: "Rosiane Rosa", email: "rose@rose.com", commission: 300 },
  ];

  return (
    <div className="flex-1 p-6">
      <div className="flex justify-between mb-5">
        <h2 className="text-2xl font-semibold">Listagem de Vendedores</h2>
        <Link to="/register-seller">
          <button className="bg-orange-600 hover:bg-orange-500 text-white p-4 rounded-md">
            Cadastrar vendedor
          </button>
        </Link>
      </div>
      <div className="bg-white p-6 rounded shadow-md">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Nome</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Comissão</th>
            </tr>
          </thead>
          <tbody>
            {mockSellers.map((seller) => (
              <tr key={seller.id}>
                <td className="py-2 px-4">{seller.id}</td>
                <td className="py-2 px-4">{seller.name}</td>
                <td className="py-2 px-4">{seller.email}</td>
                <td className="py-2 px-4">R$ {seller.commission.toFixed(2)}</td>
                <td className="py-2 px-4">
                  <button
                    className="text-blue-500 hover:text-blue-700 mx-2 p-2 rounded-lg hover:bg-blue-100 transition-all duration-200"
                    title="Editar"
                    onClick={() => console.log(`Editar vendedor ${seller.id}`)}>
                    <FaEdit className="text-xl" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-100 transition-all duration-200"
                    title="Excluir"
                    onClick={() => console.log(`Excluir vendedor ${seller.id}`)}>
                    <FaTrash className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
