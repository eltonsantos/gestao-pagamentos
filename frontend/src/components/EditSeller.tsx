import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export function EditSeller({ id }: { id: string }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    commission_percentage: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const loadSeller = async () => {
      const response = await api.get(`/users/${id}`);
      setFormData({
        name: response.data.name,
        email: response.data.email,
        commission_percentage: response.data.commission.percentage
      });
    };
    loadSeller();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/users/${id}`, formData);
      console.log("Editado com sucesso")
      setSuccess("Vendedor editado com sucesso.");
    } catch (error) {
      console.error('Erro ao atualizar vendedor:', error);
      setError("Erro inesperado.");
    }
  };

  return (
    <div className="flex-1 p-6">
      <h2 className="text-2xl font-semibold mb-4">Cadastrar Vendedor</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

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