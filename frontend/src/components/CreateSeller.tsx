/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { api } from '../services/api';
import { toast } from "react-toastify";

export function CreateSeller() {
  const [formData, setFormData] = useState({
    user: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      commission_percentage: ''
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/users', formData);
      toast.success("Vendedor criado com sucesso")

      setFormData({
        user: {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
          commission_percentage: ''
        }
      });
    } catch (error: any) {
      console.error('Erro ao criar vendedor:', error);
      toast.error(error.message);
      // setError(error.response?.data?.errors?.join(', ') || "Erro ao criar vendedor");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      user: {
        ...prev.user,
        [name]: value
      }
    }));
  };

  return (
    <div className="flex-1 p-6">
      <h2 className="text-2xl font-semibold mb-4">Cadastrar Vendedor</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
        <div>
          <label className="block text-sm font-medium">Nome</label>
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={formData.user.name}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.user.email}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Senha</label>
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.user.password}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Confirmar Senha</label>
          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirmar Senha"
            value={formData.user.password_confirmation}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Comissão (%)</label>
          <input
            type="number"
            name="commission_percentage"
            placeholder="Comissão (%)"
            value={formData.user.commission_percentage}
            onChange={handleInputChange}
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