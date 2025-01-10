import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { fetchUsers } from "../services/api";

interface User {
  id: number;
  name: string;
  email: string;
  role: number;
  commission?: {
    percentage: number;
  };
}

export function ListSeller() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Erro ao carregar usuários', error);
      }
    };
  
    loadUsers();
  }, []);

  return (
    <div className="flex-1 p-6">
      <div className="flex justify-between mb-5">
        <h2 className="text-2xl font-semibold">Listagem de Vendedores</h2>
        <Link to="/create-seller">
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
            {users.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4">{user.id}</td>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">
                  {user.commission?.percentage != null
                    ? `${Number(user.commission.percentage).toFixed(2)}%`
                    : "Não disponível"}
                </td>
                <td className="py-2 px-4">
                  <Link to={`/edit-seller/${user.id}`}>
                    <button
                      className="text-blue-500 hover:text-blue-700 mx-2 p-2 rounded-lg hover:bg-blue-100 transition-all duration-200"
                      title="Editar"
                    >
                      <FaEdit className="text-xl" />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
