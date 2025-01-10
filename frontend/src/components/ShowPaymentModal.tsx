import { useState, useEffect } from "react";
import Modal from 'react-modal';
import { api } from '../services/api';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface PaymentProps {
  id: string;
  value: number;
  status: string;
  gateway: string;
  created_at: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  user: {
    name: string;
    commission: {
      percentage: number;
    };
  };
}

interface ShowPaymentModalProps {
  isOpen: boolean;
  selectedPaymentId: string | null;
  onRequestClose: () => void;
}

export function ShowPaymentModal({ isOpen, selectedPaymentId, onRequestClose }: ShowPaymentModalProps) {
  const [payment, setPayment] = useState<PaymentProps | null>(null);

  useEffect(() => {
    const fetchPayment = async () => {
      if (selectedPaymentId) {
        try {
          const response = await api.get(`/payments/${selectedPaymentId}`);
          setPayment(response.data);
        } catch (error) {
          console.error('Erro ao carregar pagamento:', error);
          setPayment(null);
        }
      }
    };
  
    fetchPayment();
  }, [selectedPaymentId]);

  if (!payment) return null;

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

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-0 w-full max-w-2xl"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="border-b p-4 flex justify-between items-center bg-gray-50 rounded-t-lg">
        <h2 className="text-xl font-semibold text-gray-800">Detalhes do Pagamento</h2>
        <button
          onClick={onRequestClose}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          Fechar
        </button>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Informações do Cliente</h3>
            <div className="mt-2 space-y-2">
              <p className="text-gray-900"><span className="font-medium">Nome:</span> {payment.customer.name}</p>
              <p className="text-gray-900"><span className="font-medium">Email:</span> {payment.customer.email}</p>
              <p className="text-gray-900"><span className="font-medium">Telefone:</span> {payment.customer.phone}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Informações da Venda</h3>
            <div className="mt-2 space-y-2">
              <p className="text-gray-900"><span className="font-medium">Vendedor:</span> {payment.user.name}</p>
              <p className="text-gray-900">
                <span className="font-medium">Valor:</span>
                {formatCurrency(payment.value)}
              </p>
              <p className="text-gray-900">
                <span className="font-medium">
                  Comissão ({payment.user.commission.percentage}%):</span>
                  {formatCurrency(payment.value * payment.user.commission.percentage / 100)}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500">Detalhes do Pagamento</h3>
          <div className="space-y-1">
            <p className="text-gray-900"><span className="font-medium">Status:</span> {formatStatus(payment.status)}</p>
            <p className="text-gray-900"><span className="font-medium">Gateway:</span> {formatGateway(payment.gateway)}</p>
            <p className="text-gray-900"><span className="font-medium">Data da Venda:</span> {format(new Date(payment.created_at), "dd/MM/yyyy - HH:mm", { locale: ptBR })}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
