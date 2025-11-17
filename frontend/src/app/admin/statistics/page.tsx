// frontend/src/app/admin/statistics/page.tsx

"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";
import { TrendingUp, DollarSign, ShoppingCart, Users } from "lucide-react";

// Komponen Kartu Statistik
function StatCard({ 
  title, 
  value, 
  change, 
  icon: Icon,
  trend 
}: { 
  title: string; 
  value: string | number; 
  change: string;
  icon: any;
  trend: 'up' | 'down';
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${trend === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
          <Icon size={24} className={trend === 'up' ? 'text-green-600' : 'text-red-600'} />
        </div>
        <span className={`text-sm font-semibold ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
      </div>
      <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

export default function StatisticsPage() {
  // Data untuk chart pendapatan mingguan
  const revenueData = [
    { day: 'Sen', pendapatan: 2400000 },
    { day: 'Sel', pendapatan: 2800000 },
    { day: 'Rab', pendapatan: 3200000 },
    { day: 'Kam', pendapatan: 2900000 },
    { day: 'Jum', pendapatan: 4100000 },
    { day: 'Sab', pendapatan: 5200000 },
    { day: 'Min', pendapatan: 4800000 },
  ];

  // Data untuk chart pesanan bulanan
  const ordersData = [
    { bulan: 'Jan', pesanan: 320 },
    { bulan: 'Feb', pesanan: 380 },
    { bulan: 'Mar', pesanan: 420 },
    { bulan: 'Apr', pesanan: 390 },
    { bulan: 'Mei', pesanan: 450 },
    { bulan: 'Jun', pesanan: 520 },
  ];

  // Data untuk pie chart menu terpopuler
  const menuData = [
    { name: 'Nasi Goreng', value: 450, color: '#3B82F6' },
    { name: 'Mie Goreng', value: 320, color: '#10B981' },
    { name: 'Ayam Bakar', value: 280, color: '#F59E0B' },
    { name: 'Sate Ayam', value: 210, color: '#EF4444' },
    { name: 'Lainnya', value: 190, color: '#8B5CF6' },
  ];

  // Data untuk area chart traffic harian
  const trafficData = [
    { jam: '08:00', pengunjung: 12 },
    { jam: '10:00', pengunjung: 28 },
    { jam: '12:00', pengunjung: 65 },
    { jam: '14:00', pengunjung: 45 },
    { jam: '16:00', pengunjung: 38 },
    { jam: '18:00', pengunjung: 82 },
    { jam: '20:00', pengunjung: 95 },
    { jam: '22:00', pengunjung: 42 },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Statistik & Analytics</h1>
      
      {/* Kartu Statistik Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Pendapatan"
          value="Rp 25.5 Jt"
          change="+12.5%"
          icon={DollarSign}
          trend="up"
        />
        <StatCard
          title="Total Pesanan"
          value="2,345"
          change="+8.2%"
          icon={ShoppingCart}
          trend="up"
        />
        <StatCard
          title="Pelanggan Aktif"
          value="1,234"
          change="+15.3%"
          icon={Users}
          trend="up"
        />
        <StatCard
          title="Rata-rata Nilai Pesanan"
          value="Rp 125K"
          change="-2.1%"
          icon={TrendingUp}
          trend="down"
        />
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Line Chart - Pendapatan Mingguan */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Pendapatan Mingguan</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip 
                formatter={(value) => `Rp ${Number(value).toLocaleString('id-ID')}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="pendapatan" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="Pendapatan"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart - Pesanan Bulanan */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Pesanan Bulanan</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ordersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="bulan" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pesanan" fill="#10B981" name="Jumlah Pesanan" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Menu Terpopuler */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Menu Terpopuler</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={menuData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
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

        {/* Area Chart - Traffic Harian */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Traffic Pengunjung Harian</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="jam" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="pengunjung" 
                stroke="#F59E0B" 
                fill="#FCD34D"
                name="Pengunjung"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Tabel Top Menu */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">Top 5 Menu Minggu Ini</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-gray-600">Ranking</th>
                <th className="text-left py-3 px-4 text-gray-600">Nama Menu</th>
                <th className="text-left py-3 px-4 text-gray-600">Terjual</th>
                <th className="text-left py-3 px-4 text-gray-600">Pendapatan</th>
              </tr>
            </thead>
            <tbody>
              {menuData.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">#{index + 1}</td>
                  <td className="py-3 px-4 font-medium">{item.name}</td>
                  <td className="py-3 px-4">{item.value} porsi</td>
                  <td className="py-3 px-4 text-green-600 font-semibold">
                    Rp {(item.value * 25000).toLocaleString('id-ID')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
