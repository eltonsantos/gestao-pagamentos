import { useState, useEffect } from "react";

export function Payment() {
  const mockCustomers = [
    { id: "1", name: "Cliente 1", email: "cliente1@cliente.com", phone: "85987651111" },
    { id: "2", name: "Cliente 2", email: "cliente2@cliente.com", phone: "85987652222" },
    { id: "3", name: "Cliente 3", email: "cliente3@cliente.com", phone: "85987653333" },
    { id: "4", name: "Cliente 4", email: "cliente4@cliente.com", phone: "85987654444" },
    { id: "5", name: "Cliente 5", email: "cliente5@cliente.com", phone: "85987655555" },
  ];

  const mockSellers = [
    { id: "1", name: "Elton Santos", commission_percentage: 10 },
    { id: "2", name: "Ericson Melo", commission_percentage: 12 },
    { id: "3", name: "Rosiane Rosa", commission_percentage: 15 },
  ];

  const mockPayments = [
    {
      id: "1",
      value: 200.0,
      status: "approved",
      gateway: "Mercado Pago",
      user_id: "1",
      customer_id: "1",
      created_at: "2025-01-01T10:00:00Z"
    },
    {
      id: "2",
      value: 150.0,
      status: "pending",
      gateway: "PagSeguro",
      user_id: "2",
      customer_id: "2",
      created_at: "2025-01-02T14:30:00Z"
    },
    {
      id: "3",
      value: 300.0,
      status: "failed",
      gateway: "Mercado Pago",
      user_id: "3",
      customer_id: "3",
      created_at: "2025-01-03T16:00:00Z"
    },
  ];

  const [payments, setPayments] = useState(mockPayments);
  const [statusFilter, setStatusFilter] = useState("");
  const [gatewayFilter, setGatewayFilter] = useState("");
  const [sellerFilter, setSellerFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    let filteredPayments = mockPayments;

    if (statusFilter) {
      filteredPayments = filteredPayments.filter(payment => payment.status === statusFilter);
    }
    if (gatewayFilter) {
      filteredPayments = filteredPayments.filter(payment => payment.gateway === gatewayFilter);
    }
    if (sellerFilter) {
      filteredPayments = filteredPayments.filter(payment => payment.user_id === sellerFilter);
    }
    if (startDate && endDate) {
      filteredPayments = filteredPayments.filter(payment => {
        const paymentDate = new Date(payment.created_at);
        return paymentDate >= new Date(startDate) && paymentDate <= new Date(endDate);
      });
    }

    setPayments(filteredPayments);
  }, [statusFilter, gatewayFilter, sellerFilter, startDate, endDate]);

  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2).replace(".", ",")}`;
  };

  // const calculateFilterSales = () => {
  //   return payments.reduce((total, payment) => total + payment.value, 0);
  // };

  const calculateTotalSales = () => {
    return mockPayments.reduce((total, payment) => total + payment.value, 0);
  };

  return (
    <div className="flex-1 p-6">
      <h2 className="text-2xl font-semibold mb-4">Pagamentos</h2>

      <div className="bg-white p-6 rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Data de Início:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Data de Fim:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status:</label>
        <select
          id="status"
          onChange={(e) => setStatusFilter(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
        >
          <option value="">Todos</option>
          <option value="pending">Pendente</option>
          <option value="approved">Aprovado</option>
          <option value="failed">Falhou</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="gateway" className="block text-sm font-medium text-gray-700">Gateway:</label>
        <select
          id="gateway"
          onChange={(e) => setGatewayFilter(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
        >
          <option value="">Todos</option>
          <option value="Mercado Pago">Mercado Pago</option>
          <option value="PagSeguro">PagSeguro</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="seller" className="block text-sm font-medium text-gray-700">Vendedor:</label>
        <select
          id="seller"
          onChange={(e) => setSellerFilter(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
        >
          <option value="">Todos</option>
          {mockSellers.map((seller) => (
            <option key={seller.id} value={seller.id}>
              {seller.name}
            </option>
          ))}
        </select>
      </div>

      <h2 className="text-white font-bold text-3xl mb-4 text-right bg-green-400 p-6">Valor total das vendas: {formatCurrency(calculateTotalSales())}</h2>

      {/* <h3 className="text-white font-bold text-3xl mb-4 text-right bg-green-400 p-6">Valor filtrado das vendas: {formatCurrency(calculateFilterSales())}</h3> */}

      <div className="bg-white p-6 rounded shadow-md">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Nome Cliente</th>
              <th className="py-2 px-4">Email Cliente</th>
              <th className="py-2 px-4">Telefone</th>
              <th className="py-2 px-4">Valor da Venda</th>
              <th className="py-2 px-4">Comissão</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Gateway</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => {
              const customer = mockCustomers.find(c => c.id === payment.customer_id);
              const seller = mockSellers.find(s => s.id === payment.user_id);

              return (
                <tr key={payment.id}>
                  <td className="py-2 px-4">{payment.id}</td>
                  <td className="py-2 px-4">{customer?.name}</td>
                  <td className="py-2 px-4">{customer?.email}</td>
                  <td className="py-2 px-4">{customer?.phone}</td>
                  <td className="py-2 px-4">{formatCurrency(payment.value)}</td>
                  <td className="py-2 px-4">{formatCurrency(payment.value * (seller?.commission_percentage ?? 0) / 100)}</td>
                  <td className="py-2 px-4">{payment.status}</td>
                  <td className="py-2 px-4">{payment.gateway}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}