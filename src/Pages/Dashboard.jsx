import React, { useEffect, useState, useMemo } from "react";
// import { getDashboardStats } from "../service/dashboardApi"; // Uncomment when ready
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
  CartesianGrid,
} from "recharts";

// ----------------------------
// CONFIGURATION
// ----------------------------
const COLORS = ["#4f46e5", "#ef4444", "#22c55e", "#eab308", "#3b82f6"];
const MONTH_NAMES = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// ----------------------------
// DUMMY DATA
// ----------------------------
const dummyStats = {
  todayReceipts: 12,
  todayDeliveries: 5,
  lowStock: [
    { _id: "1", productId: { name: "Blue Ballpoint Pen" }, location: "Row A - Shelf 1", available: 5 },
    { _id: "2", productId: { name: "A4 Notebook" }, location: "Row B - Shelf 3", available: 2 },
    { _id: "3", productId: { name: "Whiteboard Marker" }, location: "Row C - Shelf 2", available: 0 },
  ],
  // Ensure IDs correspond to Month Numbers (1 = Jan, 2 = Feb)
  monthlyStockIn: [
    { _id: 1, total: 120 },
    { _id: 2, total: 90 },
    { _id: 3, total: 150 },
    { _id: 4, total: 200 },
  ],
  monthlyStockOut: [
    { _id: 1, total: 80 },
    { _id: 2, total: 40 },
    { _id: 3, total: 120 },
    { _id: 4, total: 180 },
  ],
  topProducts: [
    { _id: "Pen", qty: 140 },
    { _id: "Pencil", qty: 80 },
    { _id: "Marker", qty: 60 },
    { _id: "Books", qty: 50 },
    { _id: "Staplers", qty: 30 },
  ],
};

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        
        // -----------------------------------------
        // REAL API CALL (Uncomment when backend is ready)
        // -----------------------------------------
        // const data = await getDashboardStats();
        
        // SIMULATING API FAILURE OR EMPTY RESPONSE FOR DEMO
        const data = null; 

        // Validation: Check if data exists and has required keys
        if (!data || !data.monthlyStockIn) {
          console.warn("⚠️ API Data missing or invalid. Loading Dummy Data.");
          setStats(dummyStats);
        } else {
          setStats(data);
        }
      } catch (err) {
        console.error("❌ API Error. Loading Dummy Data.", err);
        setStats(dummyStats);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  // ----------------------------
  // DATA PROCESSING (Memoized)
  // ----------------------------
  const chartData = useMemo(() => {
    if (!stats) return [];

    // Create a map to merge In/Out based on Month ID (1-12)
    const dataMap = new Map();

    // Process Stock In
    stats.monthlyStockIn.forEach((item) => {
      dataMap.set(item._id, {
        name: MONTH_NAMES[item._id] || `M${item._id}`,
        monthIndex: item._id,
        received: item.total,
        delivered: 0,
      });
    });

    // Process Stock Out (Merge into existing or create new)
    stats.monthlyStockOut.forEach((item) => {
      if (dataMap.has(item._id)) {
        dataMap.get(item._id).delivered = item.total;
      } else {
        dataMap.set(item._id, {
          name: MONTH_NAMES[item._id] || `M${item._id}`,
          monthIndex: item._id,
          received: 0,
          delivered: item.total,
        });
      }
    });

    // Convert Map to Array and Sort by Month Index
    return Array.from(dataMap.values()).sort((a, b) => a.monthIndex - b.monthIndex);
  }, [stats]);

  // ----------------------------
  // RENDER
  // ----------------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p>Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!stats) return <div className="text-white text-center mt-10">No Data Available</div>;

  return (
    <div className="p-6 bg-black min-h-screen text-white font-sans">
      
      {/* Header */}
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">📊 Inventory Dashboard</h1>
          <p className="text-zinc-400 text-sm mt-1">Real-time overview of stock movements</p>
        </div>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm transition"
        >
          Refresh Data
        </button>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Today Receipts" 
          value={stats.todayReceipts} 
          color="text-indigo-400" 
        />
        <StatCard 
          title="Today Deliveries" 
          value={stats.todayDeliveries} 
          color="text-emerald-400" 
        />
        <StatCard 
          title="Low Stock Alerts" 
          value={stats.lowStock.length} 
          color="text-red-400" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        {/* Bar Chart: Monthly Stats */}
        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-lg">
          <h2 className="text-lg font-semibold mb-6 text-zinc-200">Monthly Stock Movement</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="name" stroke="#71717a" tick={{ fill: '#a1a1aa' }} />
                <YAxis stroke="#71717a" tick={{ fill: '#a1a1aa' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', color: '#fff' }} 
                  itemStyle={{ color: '#fff' }}
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                />
                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                <Bar dataKey="received" fill="#4f46e5" name="Stock In" radius={[4, 4, 0, 0]} />
                <Bar dataKey="delivered" fill="#ef4444" name="Stock Out" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Top Products */}
        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-lg">
          <h2 className="text-lg font-semibold mb-6 text-zinc-200">Top Moved Products</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.topProducts}
                  dataKey="qty"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  innerRadius={60} // Makes it a Donut chart (looks more modern)
                  outerRadius={100}
                  paddingAngle={5}
                >
                  {stats.topProducts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', borderRadius: '8px' }} />
                <Legend layout="vertical" verticalAlign="middle" align="right" iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Low Stock Table */}
      <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-zinc-200">Low Stock Warnings</h2>
          <span className="bg-red-500/10 text-red-400 text-xs font-bold px-3 py-1 rounded-full">
            Action Required
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-zinc-500 text-sm border-b border-zinc-800">
                <th className="pb-3 font-medium">Product Name</th>
                <th className="pb-3 font-medium">Location</th>
                <th className="pb-3 font-medium">Quantity</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {stats.lowStock.map((stock) => (
                <tr key={stock._id} className="group border-b border-zinc-800/50 hover:bg-zinc-800/30 transition">
                  <td className="py-4 text-zinc-300">{stock.productId?.name || "Unknown Product"}</td>
                  <td className="py-4 text-zinc-400">{stock.location}</td>
                  <td className="py-4 font-bold text-zinc-200">{stock.available}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      stock.available === 0 ? 'bg-red-900/30 text-red-400' : 'bg-orange-900/30 text-orange-400'
                    }`}>
                      {stock.available === 0 ? 'Out of Stock' : 'Low Stock'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {stats.lowStock.length === 0 && (
            <p className="text-zinc-500 text-center py-8">All stock levels are healthy!</p>
          )}
        </div>
      </div>

    </div>
  );
};

// Simple Reusable Component for KPI Cards
const StatCard = ({ title, value, color }) => (
  <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow hover:border-zinc-700 transition">
    <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">{title}</h3>
    <p className={`text-4xl font-bold mt-3 ${color}`}>{value}</p>
  </div>
);

export default Dashboard;