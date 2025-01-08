import React, { useState } from "react";

const mockSellers = [
  { id: "1", name: "Elton Santos", commission_percentage: 10 },
  { id: "2", name: "Ericson Melo", commission_percentage: 12 },
  { id: "3", name: "Rosiane Rosa", commission_percentage: 15 },
];

const mockCustomers = [
  { id: "1", name: "Cliente 1", email: "cliente1@cliente.com", phone: "85987651111" },
  { id: "2", name: "Cliente 2", email: "cliente2@cliente.com", phone: "85987652222" },
  { id: "3", name: "Cliente 3", email: "cliente3@cliente.com", phone: "85987653333" },
  { id: "4", name: "Cliente 4", email: "cliente4@cliente.com", phone: "85987654444" },
  { id: "5", name: "Cliente 5", email: "cliente5@cliente.com", phone: "85987655555" },
];

export function Checkout() {
  const [sellers, ] = useState(mockSellers);
  const [customers, ] = useState(mockCustomers);
  const [selectedSeller, setSelectedSeller] = useState<string | undefined>(undefined);
  const [selectedCustomer, setSelectedCustomer] = useState<string | undefined>(undefined);
  const [saleValue, setSaleValue] = useState<number>(0);
  const [gateway, setGateway] = useState<string>("");
  const [commission, setCommission] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const seller = sellers.find((s) => s.id === selectedSeller);
    const customer = customers.find((c) => c.id === selectedCustomer);

    const saleData = {
      value: saleValue,
      gateway,
      seller: seller?.name,
      customer: customer?.name,
      commission,
    };

    const valorComissao = (saleData.value * saleData.commission) / 100;

    console.log("Venda realizada:", saleData);
    console.log(`Valor que o vendedor ${saleData.seller} ganhou de comissão: R$ ${valorComissao.toFixed(2)}`);

    setSaleValue(0);
    setGateway("");
    setSelectedSeller("");
    setSelectedCustomer("");
    setCommission(0);
  };

  const handleSellerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sellerId = e.target.value;
    setSelectedSeller(sellerId);

    const selected = sellers.find((seller) => seller.id === sellerId);
    if (selected) {
      setCommission(selected.commission_percentage);
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
                  {seller.name} - Comissão: {seller.commission_percentage}%
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
                  {customer.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Comissão</label>
            <input
              type="text"
              value={`R$ ${commission.toFixed(2)}`}
              readOnly
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md sm:text-sm"
            />
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 focus:outline-none"
            >
              Efetuar Venda
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}