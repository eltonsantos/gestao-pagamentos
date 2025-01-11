/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from "chart.js";
import { useAuth } from "../contexts/AuthContext";
import numeral from "numeral";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

export function Home() {
  const { userEmail, isAdmin } = useAuth();
  const [topSellers, setTopSellers] = useState<any[]>([]);
  const [salesByDate, setSalesByDate] = useState<any[]>([]);

  useEffect(() => {
    if (isAdmin) {
      const fetchTopSellers = async () => {
        try {
          const response = await api.get("/payments/top_selling_sellers");
          setTopSellers(response.data);
        } catch (error) {
          console.error("Erro ao buscar vendedores:", error);
        }
      };
  
      const fetchSalesByDate = async () => {
        try {
          const response = await api.get("/payments/sales_by_date");
          setSalesByDate(response.data);
        } catch (error) {
          console.error("Erro ao buscar vendas por data:", error);
        }
      };
  
      fetchTopSellers();
      fetchSalesByDate();
    }
  }, [isAdmin]);

  const formatCurrency = (value: number) => {
    return `R$ ${numeral(value).format('0,0.00')}`;
  };

  const limitedSalesData = salesByDate.slice(-10);

  const pieChartData = {
    labels: topSellers.map((seller) => seller.name),
    datasets: [
      {
        data: topSellers.map((seller) => seller.total_sales),
        backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#4bc0c0'],
        label: "Total de Vendas"
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            const value = tooltipItem.raw;
            return `${formatCurrency(value)}`;
          },
        },
      },
    },
  };

  const barChartData = {
    labels: limitedSalesData.map((sale) => sale.date),
    datasets: [
      {
        label: "Quantidade de Vendas",
        data: limitedSalesData.map((sale) => sale.sales_count),
        backgroundColor: '#8b7198',
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Data",
        },
        ticks: {
          maxTicksLimit: 10,
        },
      },
      y: {
        title: {
          display: true,
          text: "Quantidade de Vendas",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            const value = tooltipItem.raw;
            const totalSales = salesByDate[tooltipItem.dataIndex].total_sales;
            return `${value} vendas | Total: ${formatCurrency(totalSales)}`;
          },
        },
      },
    },
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl">
        Olá, bem vindo <span className="text-orange-600"><b>{userEmail}</b></span>
        <br /><br />
        ao sistema <b>Gestão de pagamentos</b>
      </h1>

      {isAdmin ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Vendedores que Mais Venderam</h2>
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Vendas por Data</h2>
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>
      ): ''}
    </div>
  );
}