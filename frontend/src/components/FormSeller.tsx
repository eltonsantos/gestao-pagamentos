import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

interface SellerData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  commission: number;
}

export function FormSeller() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SellerData>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    commission: 0,
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/users/${id}`).then((response) => {
        setFormData({
          name: response.data.name,
          email: response.data.email,
          password: "",
          password_confirmation: "",
          commission: response.data.commission,
        });
      });
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      if (id) {
        await axios.put(`http://localhost:3000/users/${id}`, {
          user: {
            ...formData,
            role: 0,
          },
        });
        setSuccess("Vendedor atualizado com sucesso!");
      } else {
        await axios.post("http://localhost:3000/users", {
          user: {
            ...formData,
            role: 0,
          },
        });
        setSuccess("Vendedor cadastrado com sucesso!");
      }

      setFormData({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        commission: 0,
      });
      navigate("/dashboard");
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.error || "Erro ao cadastrar/atualizar vendedor.");
      } else {
        setError("Erro inesperado.");
      }
    }
  };

  return (
    <div className="flex-1 p-6">
      <h2 className="text-2xl font-semibold mb-4">{id ? "Editar Vendedor" : "Cadastrar Vendedor"}</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <div>
          <label className="block text-sm font-medium">Nome</label>
          <input
            type="text"
            name="name"
            value={formData.name}
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
            value={formData.email}
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
            value={formData.password}
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
            value={formData.password_confirmation}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Comissão (%)</label>
          <input
            type="number"
            name="commission"
            value={formData.commission}
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
          {id ? "Atualizar Vendedor" : "Cadastrar Vendedor"}
        </button>
      </form>
    </div>
  );
}