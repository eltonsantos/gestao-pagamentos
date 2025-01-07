export function Dashboard() {
  return (
    <div className="flex-1 p-6">
      <h2 className="text-2xl font-semibold mb-4">Listagem de Usuários</h2>
      <div className="bg-white p-6 rounded shadow-md">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Nome</th>
              <th className="py-2 px-4">Comissão</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4">1</td>
              <td className="py-2 px-4">Elton Santos</td>
              <td className="py-2 px-4">R$ 200,00</td>
            </tr>
            <tr>
              <td className="py-2 px-4">2</td>
              <td className="py-2 px-4">Ericson Melo</td>
              <td className="py-2 px-4">R$ 250,00</td>
            </tr>
            <tr>
              <td className="py-2 px-4">3</td>
              <td className="py-2 px-4">Rosiane Rosa</td>
              <td className="py-2 px-4">R$ 300,00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}