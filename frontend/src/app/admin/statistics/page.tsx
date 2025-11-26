// frontend/src/app/admin/statistics/page.tsx
"use client";

import { useState, useEffect } from "react";
import api from "../../../lib/axios"; // Import API
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from "recharts";
import { TrendingUp, DollarSign, ShoppingCart, Users, Loader2 } from "lucide-react";

function StatCard({ title, value, icon: Icon, color }: any) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4 border border-gray-100">
      <div className={`p-4 rounded-full ${color} bg-opacity-10`}>
        <Icon size={28} className={color.replace("bg-", "text-")} />
      </div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
    </div>
  );
}

export default function StatisticsPage() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<any>({});
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [ordersData, setOrdersData] = useState<any[]>([]);
  const [menuData, setMenuData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/admin/analytics/dashboard");
        const { summary, charts } = res.data.data;

        setSummary(summary);
        setRevenueData(charts.revenue);
        setOrdersData(charts.orders);
        setMenuData(charts.menu);
      } catch (error) {
        console.error("Failed to fetch analytics", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Statistik & Analytics</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Pendapatan" value={`Rp ${summary.totalRevenue?.toLocaleString('id-ID')}`} icon={DollarSign} color="text-green-600" />
        <StatCard title="Total Pesanan" value={summary.totalOrders} icon={ShoppingCart} color="text-blue-600" />
        <StatCard title="Pelanggan" value={summary.totalCustomers} icon={Users} color="text-purple-600" />
        <StatCard title="Rata-rata Order" value={`Rp ${summary.avgOrderValue?.toLocaleString('id-ID')}`} icon={TrendingUp} color="text-orange-600" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-bold mb-4">Pendapatan Mingguan</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip formatter={(value: number) => `Rp ${value.toLocaleString('id-ID')}`} />
              <Line type="monotone" dataKey="pendapatan" stroke="#10B981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Orders */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-bold mb-4">Pesanan Bulanan</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ordersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="bulan" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="pesanan" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Menu */}
        <div className="bg-white p-6 rounded-xl shadow lg:col-span-2">
          <h3 className="text-lg font-bold mb-4">5 Menu Terpopuler</h3>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={menuData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {menuData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              {menuData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="font-bold text-gray-600">{item.value} Terjual</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}