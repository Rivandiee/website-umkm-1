// frontend/src/app/admin/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  BarChart3, 
  ShoppingBag, 
  UtensilsCrossed, 
  QrCode,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState([
    { 
      id: 1, 
      title: "Menu Tersedia", 
      value: 12, 
      href: "/admin/menus",
      icon: UtensilsCrossed,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      change: "+2 dari minggu lalu"
    },
    { 
      id: 2, 
      title: "Pesanan Hari Ini", 
      value: 5, 
      href: "/admin/orders",
      icon: ShoppingBag,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      change: "3 menunggu konfirmasi"
    },
    { 
      id: 3, 
      title: "Meja Terdaftar", 
      value: 10, 
      href: "/admin/qr-tables",
      icon: QrCode,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      change: "Semua aktif"
    },
    { 
      id: 4, 
      title: "Total Transaksi", 
      value: 2450000, 
      href: "/admin/statistics",
      icon: BarChart3,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      change: "+12% dari kemarin",
      isCurrency: true
    },
  ]);

  const [recentOrders, setRecentOrders] = useState([
    { id: 1, table: "Meja 3", status: "pending", time: "5 menit lalu", total: 125000 },
    { id: 2, table: "Meja 7", status: "completed", time: "15 menit lalu", total: 85000 },
    { id: 3, table: "Meja 2", status: "processing", time: "20 menit lalu", total: 200000 },
  ]);

  const quickActions = [
    {
      title: "Statistik Penjualan",
      href: "/admin/statistics",
      icon: TrendingUp,
      color: "from-indigo-500 to-indigo-600",
      description: "Lihat laporan lengkap"
    },
    {
      title: "Kelola Menu",
      href: "/admin/menus",
      icon: UtensilsCrossed,
      color: "from-green-500 to-green-600",
      description: "Tambah & edit menu"
    },
    {
      title: "Kelola Pesanan",
      href: "/admin/orders",
      icon: ShoppingBag,
      color: "from-purple-500 to-purple-600",
      description: "Monitor pesanan masuk"
    },
  ];

  useEffect(() => {
    // Simulasi fetch data
  }, []);

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: { label: "Menunggu", color: "bg-yellow-100 text-yellow-700", icon: Clock },
      processing: { label: "Diproses", color: "bg-blue-100 text-blue-700", icon: AlertCircle },
      completed: { label: "Selesai", color: "bg-green-100 text-green-700", icon: CheckCircle },
    };
    const badge = badges[status as keyof typeof badges];
    const Icon = badge.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${badge.color}`}>
        <Icon className="w-3 h-3" />
        {badge.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Main Content Container - Full Screen */}
      <div className="flex-1 overflow-y-auto">
        <div className="h-full px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-[1600px] mx-auto h-full flex flex-col">
            
            {/* Header - Fixed Height */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex-shrink-0"
            >
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
                Dashboard Admin
              </h1>
              <p className="text-sm lg:text-base text-gray-600">
                Kelola restoran Anda dengan mudah dan efisien
              </p>
            </motion.div>

            {/* Stats Grid - Flexible */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-6 flex-shrink-0"
            >
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="group"
                  >
                    <Link href={stat.href}>
                      <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer h-full">
                        <div className="flex items-start justify-between mb-3 lg:mb-4">
                          <div className={`p-2.5 lg:p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform`}>
                            <Icon className={`w-5 h-5 lg:w-6 lg:h-6 ${stat.textColor}`} />
                          </div>
                          <div className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${stat.color} text-white font-semibold`}>
                            Live
                          </div>
                        </div>
                        
                        <h3 className="text-gray-600 text-xs lg:text-sm font-medium mb-1">
                          {stat.title}
                        </h3>
                        
                        <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                          {stat.isCurrency 
                            ? `Rp ${stat.value.toLocaleString('id-ID')}`
                            : stat.value.toLocaleString()}
                        </p>
                        
                        <p className="text-xs text-gray-500">
                          {stat.change}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Bottom Section - Takes Remaining Space */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6 flex-1 min-h-0">
              
              {/* Recent Orders - Scrollable */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="xl:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col overflow-hidden"
              >
                <div className="flex items-center justify-between p-5 lg:p-6 border-b border-gray-100 flex-shrink-0">
                  <h2 className="text-lg lg:text-xl font-bold text-gray-900">
                    Pesanan Terbaru
                  </h2>
                  <Link 
                    href="/admin/orders"
                    className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold hover:underline"
                  >
                    Lihat Semua →
                  </Link>
                </div>

                <div className="flex-1 overflow-y-auto p-5 lg:p-6">
                  <div className="space-y-3 lg:space-y-4">
                    {recentOrders.map((order) => (
                      <motion.div
                        key={order.id}
                        whileHover={{ x: 4 }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3 lg:gap-4">
                          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-sm lg:text-base">
                            {order.table.split(' ')[1]}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm lg:text-base">{order.table}</p>
                            <p className="text-xs lg:text-sm text-gray-500">{order.time}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 lg:gap-4">
                          <div className="text-right">
                            <p className="font-bold text-gray-900 text-sm lg:text-base">
                              Rp {order.total.toLocaleString('id-ID')}
                            </p>
                            {getStatusBadge(order.status)}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Quick Actions - Scrollable */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col overflow-hidden"
              >
                <div className="p-5 lg:p-6 border-b border-gray-100 flex-shrink-0">
                  <h2 className="text-lg lg:text-xl font-bold text-gray-900">
                    Aksi Cepat
                  </h2>
                </div>

                <div className="flex-1 overflow-y-auto p-5 lg:p-6">
                  <div className="space-y-3">
                    {quickActions.map((action, index) => {
                      const Icon = action.icon;
                      return (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Link href={action.href}>
                            <div className={`p-4 rounded-xl bg-gradient-to-r ${action.color} hover:shadow-lg transition-all cursor-pointer group`}>
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 lg:w-10 lg:h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                                  <Icon className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-semibold text-white text-sm lg:text-base">
                                    {action.title}
                                  </p>
                                  <p className="text-xs text-white/80 truncate">
                                    {action.description}
                                  </p>
                                </div>
                                <span className="text-white/80 group-hover:translate-x-1 transition-transform flex-shrink-0">
                                  →
                                </span>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
