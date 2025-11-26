"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import api from "../../lib/axios"; // Import API helper
import { 
  BarChart3, 
  ShoppingBag, 
  UtensilsCrossed, 
  QrCode,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react";

// ... (Variant animation tetap sama) ...
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [summaryData, setSummaryData] = useState<any>(null);
  
  // State untuk stats cards
  const [stats, setStats] = useState([
    { 
      id: 1, title: "Total Pesanan", value: 0, href: "/admin/orders",
      icon: ShoppingBag, color: "from-blue-500 to-blue-600", bgColor: "bg-blue-50", textColor: "text-blue-600"
    },
    { 
      id: 2, title: "Total Pendapatan", value: 0, href: "/admin/statistics",
      icon: BarChart3, color: "from-green-500 to-green-600", bgColor: "bg-green-50", textColor: "text-green-600", isCurrency: true
    },
    { 
      id: 3, title: "Pelanggan", value: 0, href: "/admin/orders",
      icon: QrCode, color: "from-purple-500 to-purple-600", bgColor: "bg-purple-50", textColor: "text-purple-600"
    },
    { 
      id: 4, title: "Rata-rata Order", value: 0, href: "/admin/statistics",
      icon: TrendingUp, color: "from-orange-500 to-orange-600", bgColor: "bg-orange-50", textColor: "text-orange-600", isCurrency: true
    },
  ]);

  // Fetch Data dari API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get("/admin/analytics/dashboard");
        const { summary } = response.data.data;

        setSummaryData(summary);
        
        // Update Stats Cards
        setStats(prev => [
          { ...prev[0], value: summary.totalOrders },
          { ...prev[1], value: summary.totalRevenue },
          { ...prev[2], value: summary.totalCustomers },
          { ...prev[3], value: summary.avgOrderValue },
        ]);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // ... (Helper functions like getStatusBadge tetap sama) ...

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="h-full px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-[1600px] mx-auto h-full flex flex-col">
            
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex-shrink-0"
            >
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
                Dashboard Admin
              </h1>
              <p className="text-sm lg:text-base text-gray-600">
                Ringkasan performa restoran Anda
              </p>
            </motion.div>

            {/* Stats Grid */}
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
                    className="group"
                  >
                    <Link href={stat.href}>
                      <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer h-full">
                        <div className="flex items-start justify-between mb-3 lg:mb-4">
                          <div className={`p-2.5 lg:p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform`}>
                            <Icon className={`w-5 h-5 lg:w-6 lg:h-6 ${stat.textColor}`} />
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
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Sisa UI (Recent Orders & Quick Actions) biarkan statis dulu atau hubungkan nanti */}
            
          </div>
        </div>
      </div>
    </div>
  );
}