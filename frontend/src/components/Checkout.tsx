import { useState, useEffect } from "react";
import { fetchUsers, fetchCustomers, api } from "../services/api";

interface Commission {
  percentage: number;

}
interface Seller {
  id: string;
  name: string;
  commission: Commission;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export function Checkout() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedSeller, setSelectedSeller] = useState<string>("");
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [saleValue, setSaleValue] = useState<number>(0);
  const [gateway, setGateway] = useState<string>("");
  const [commission, setCommission] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [sellersData, customersData] = await Promise.all([
          fetchUsers(),
          fetchCustomers()
        ]);
        
        setSellers(sellersData);
        setCustomers(customersData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.post('/payments', {
        payment: {
          value: saleValue,
          gateway: gateway.toLowerCase().replace(" ", "_"),
          user_id: selectedSeller,
          customer_id: selectedCustomer,
          commission: commission,
        }
      });

      setSaleValue(0);
      setGateway("");
      setSelectedSeller("");
      setSelectedCustomer("");
      setCommission(0);

      alert("Venda registrada com sucesso!");
    } catch (error) {
      console.error("Erro ao registrar venda:", error);
      alert("Erro ao registrar venda. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSellerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sellerId = e.target.value;
    console.log("Vendedor: ", sellerId)
    setSelectedSeller(sellerId);

    console.log("Vendedores: ", sellers)
    
    const selected = sellers.find((seller) => seller.id === sellerId);
    console.log("Selecionado: ", selected)
    if (selected && selected.commission) {
      console.log("Comissao: ", selected.commission)
      setCommission(selected.commission.percentage);
    }
  };

  return (
    <div className="flex-1 p-6">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
      <div className="bg-white p-6 rounded shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Valor da Venda</label>
            <input
              type="number"
              value={saleValue}
              onChange={(e) => setSaleValue(parseFloat(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Gateway de Pagamento</label>
            <select
              value={gateway}
              onChange={(e) => setGateway(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            >
              <option value="">Selecione o gateway de pagamento</option>
              <option value="Mercado Pago">Mercado Pago</option>
              <option value="PagSeguro">PagSeguro</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Vendedor</label>
            <select
              value={selectedSeller}
              onChange={handleSellerChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            >
              <option value="">Selecione um Vendedor</option>
              {sellers.map((seller) => (
                <option key={seller.id} value={seller.id}>
                  {seller.name} - Comissão: {seller.commission?.percentage}%
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Cliente</label>
            <select
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            >
              <option value="">Selecione um Cliente</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name} - {customer.email}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Comissão</label>
            <input
              type="text"
              value={`${commission}%`}
              readOnly
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md sm:text-sm"
            />
          </div>

          <div className="mt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 focus:outline-none"
            >
              {isLoading ? 'Processando...' : 'Efetuar Venda'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}