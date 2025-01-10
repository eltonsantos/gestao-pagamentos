/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { fetchPayments } from "../services/api"
import { api } from '../services/api';
import ReactPaginate from "react-paginate";

export function Payment() {
  const [payments, setPayments] = useState<any[]>([]);
  const [, setTotalValue] = useState(0);
  const [totalAllPayments, setTotalAllPayments] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");
  const [gatewayFilter, setGatewayFilter] = useState("");
  const [sellerFilter, setSellerFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sellers, setSellers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
      const checkUserRole = async () => {
        try {
          const response = await api.get('/users/current');
          setUserRole(response.data.role);
        } catch (error) {
          console.error('Erro ao verificar papel do usuário:', error);
        }
      };
      checkUserRole();
    }, [userRole]);

  useEffect(() => {
    const fetchTotalData = async () => {
      const data = await fetchPayments({});
      setTotalAllPayments(Number(data.total_value));
    };

    fetchTotalData();
  }, []); 

  useEffect(() => {
    const fetchData = async () => {
      const filters = {
        status: statusFilter,
        gateway: gatewayFilter,
        seller_id: sellerFilter,
        start_date: startDate,
        end_date: endDate,
        page: currentPage + 1,
      };
      const data = await fetchPayments(filters);

      setPayments(data.payments.map((payment: any) => ({
        ...payment,
        value: parseFloat(payment.value)
      })));
      setTotalValue(Number(data.total_value || 0));
      setSellers(data.sellers || []);
      setTotalPages(data.total_pages);
    };

    fetchData();
  }, [statusFilter, gatewayFilter, sellerFilter, startDate, endDate, currentPage]);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const formatCurrency = (value: number | string) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return `R$ ${numValue.toFixed(2).replace(".", ",")}`;
  };

  const formatStatus = (status: string) => {
    const statusMap: { [key: string]: string } = {
      pending: "Pendente",
      approved: "Aprovado",
      failed: "Falhou"
    };
    return statusMap[status] || status;
  };

  const formatGateway = (gateway: string) => {
    const gatewayMap: { [key: string]: string } = {
      mercado_pago: "Mercado Pago",
      pagseguro: "PagSeguro"
    };
    return gatewayMap[gateway] || gateway;
  };

  const calculateFilterSales = () => {
    return payments.reduce((total, payment) => {
      const value = typeof payment.value === 'string' ? parseFloat(payment.value) : payment.value;
      return total + value;
    }, 0);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-purple-500";
      case "approved":
        return "text-green-500";
      case "failed":
        return "text-red-500";
    }
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
          <option value="mercado_pago">Mercado Pago</option>
          <option value="pagseguro">PagSeguro</option>
        </select>
      </div>

      {userRole === "admin" && (
        <div className="mb-4">
          <label htmlFor="seller" className="block text-sm font-medium text-gray-700">Vendedor:</label>
          <select
            id="seller"
            onChange={(e) => setSellerFilter(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          >
            <option value="">Todos</option>
            {sellers.map(seller => (
              <option key={seller.id} value={seller.id}>
                {seller.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <h2 className="text-white font-bold text-3xl mb-4 text-right bg-green-400 p-6">Valor total das vendas: {formatCurrency(totalAllPayments)}</h2>

      <h3 className="text-white font-bold text-3xl mb-4 text-right bg-green-400 p-6">Valor filtrado das vendas: {formatCurrency(calculateFilterSales())}</h3>

      <div className="bg-white p-6 rounded shadow-md">
        <table className="w-full">
          <thead>
            <tr className="border-b">
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
              const customer = payment.customer;
              const seller = payment.user;
              const commissionValue = payment.value * (seller?.commission?.percentage ?? 0) / 100;

              return (
                <tr key={payment.id}>
                  <td className="py-2 px-4">{customer?.name}</td>
                  <td className="py-2 px-4">{customer?.email}</td>
                  <td className="py-2 px-4">{customer?.phone}</td>
                  <td className="py-2 px-4">{formatCurrency(payment.value)}</td>
                  <td className="py-2 px-4">{formatCurrency(commissionValue)}</td>
                  <td className={`py-2 px-4 ${getStatusColor(payment.status)}`}>{formatStatus(payment.status)}</td>
                  <td className="py-2 px-4">{formatGateway(payment.gateway)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <ReactPaginate
            previousLabel={<span className="font-semibold text-gray-700">{"Anterior"}</span>}
            nextLabel={<span className="font-semibold text-gray-700">{"Próxima"}</span>}
            pageCount={totalPages}
            onPageChange={handlePageClick}
            containerClassName="flex space-x-2"
            pageClassName="px-4 py-2 border rounded-md text-sm cursor-pointer hover:bg-gray-200"
            previousClassName="px-4 py-2 border rounded-md text-sm cursor-pointer hover:bg-gray-200"
            nextClassName="px-4 py-2 border rounded-md text-sm cursor-pointer hover:bg-gray-200"
            activeClassName="bg-blue-500 text-white"
          />
        </div>
      )}
    </div>
  );
}