/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../services/api';
import { toast } from "react-toastify";

export function EditSeller() {
  const { id } = useParams(); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    commission_percentage: '',
    password: '',
    password_confirmation: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loadSeller = async () => {
      const response = await api.get(`/users/${id}`);
      setFormData({
        name: response.data.name,
        email: response.data.email,
        commission_percentage: response.data.commission.percentage,
        password: '',
        password_confirmation: '',
      });
    };
    loadSeller();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/users/${id}`, {
        user: {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.password_confirmation,
        },
        commission_percentage: formData.commission_percentage,
      });
      toast.success("Vendedor atualizado com sucesso")
      navigate('/sellers');
    } catch (error: any) {
      console.error('Erro ao atualizar vendedor:', error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex-1 p-6">
      <h2 className="text-2xl font-semibold mb-4">Cadastrar Vendedor</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">

        <div>
          <label className="block text-sm font-medium">Nome</label>
          <input
            type="text"
            placeholder="Nome"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full p-2 mt-1 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
            className="w-full p-2 mt-1 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Comissão (%)</label>
          <input
            type="number"
            placeholder="Comissão (%)"
            value={formData.commission_percentage}
            onChange={e => setFormData({...formData, commission_percentage: e.target.value})}
            className="w-full p-2 mt-1 border border-gray-300 rounded"
            required
            min="0"
            max="100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Senha (deixe em branco para não alterar)</label>
          <input
            type="password"
            placeholder="Senha"
            value={formData.password}
            onChange={e => setFormData({...formData, password: e.target.value})}
            className="w-full p-2 mt-1 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Confirmação de Senha</label>
          <input
            type="password"
            placeholder="Confirme a Senha"
            value={formData.password_confirmation}
            onChange={e => setFormData({...formData, password_confirmation: e.target.value})}
            className="w-full p-2 mt-1 border border-gray-300 rounded"
          />
        </div>
        
        <button
          type="submit"
          className="w-full py-2 px-4 mt-4 bg-orange-600 text-white rounded hover:bg-orange-700"
        >
          Cadastrar Vendedor
        </button>
      </form>
    </div>
  );
}