import React, { useEffect, useState } from "react";
import { getDashboardStats } from "../service/dashboardApi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Pie,
  PieChart,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#4f46e5", "#ef4444", "#22c55e", "#eab308", "#3b82f6"];

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await getDashboardStats();
      setStats(data);
    }
    load();
  }, []);

  if (!stats) return <p className="text-white text-center mt-10">Loading dashboard...</p>;

  const monthlyData = [
    ...stats.monthlyStockIn.map((m) => ({
      month: `M${m._id}`,
      received: m.total,
      delivered: 0,
    })),
  ];

  stats.monthlyStockOut.forEach((out) => {
    const record = monthlyData.find((m) => m.month === `M${out._id}`);
    if (record) {
      record.delivered = out.total;
    } else {
      monthlyData.push({
        month: `M${out._id}`,
        delivered: out.total,
        received: 0,
      });
    }
  });

  return (
    <div className="p-6 bg-black min-h-screen text-white">

      {/* Dashboard Title */}
      <h1 className="text-3xl font-bold mb-6">📊 Inventory Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        
        <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 shadow">
          <h3 className="text-lg text-zinc-400">Today Receipts</h3>
          <p className="text-3xl font-bold mt-2">{stats.todayReceipts}</p>
        </div>

        <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 shadow">
          <h3 className="text-lg text-zinc-400">Today Deliveries</h3>
          <p className="text-3xl font-bold mt-2">{stats.todayDeliveries}</p>
        </div>

        <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 shadow">
          <h3 className="text-lg text-zinc-400">Low Stock Items</h3>
          <p className="text-3xl font-bold mt-2">{stats.lowStock.length}</p>
        </div>

      </div>

      {/* Monthly Stock In vs Out Chart */}
      <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Monthly Stock In vs Stock Out</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <XAxis dataKey="month" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Legend />

            <Bar dataKey="received" fill="#4f46e5" name="Stock In" />
            <Bar dataKey="delivered" fill="#ef4444" name="Stock Out" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Moved Products */}
      <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Top 5 Moved Products</h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={stats.topProducts}
              dataKey="qty"
              nameKey="_id"
              cx="50%"
              cy="50%"
              outerRadius={110}
              label
            >
              {stats.topProducts.map((_, idx) => (
                <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Low Stock Table */}
      <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 shadow">
        <h2 className="text-xl font-semibold mb-4">Low Stock Alerts</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="text-zinc-400">
              <th className="pb-2">Product</th>
              <th className="pb-2">Location</th>
              <th className="pb-2">Available</th>
            </tr>
          </thead>

          <tbody>
            {stats.lowStock.map((stock) => (
              <tr key={stock._id} className="border-t border-zinc-800">
                <td className="py-2">{stock.productId?.name}</td>
                <td className="py-2">{stock.location}</td>
                <td className="py-2 text-red-400">{stock.available}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default Dashboard;
