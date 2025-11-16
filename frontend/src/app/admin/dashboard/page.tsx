"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminDashboard() {
  // Dummy data (bisa diganti fetch API)
  const stats = [
    { id: 1, title: "Menu Tersedia", value: 12, href: "/admin/menus" },
    { id: 2, title: "Pesanan Hari Ini", value: 5, href: "/admin/orders" },
    { id: 3, title: "Meja Terdaftar", value: 10, href: "/admin/tables" },
    { id: 4, title: "Transaksi", value: 150000, href: "/admin/transactions" },
  ];

  return (
    <div className="min-h-screen p-5 max-w-6xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6 text-gray-800"
      >
        Dashboard Admin
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat) => (
          <Link key={stat.id} href={stat.href}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-5 shadow-lg cursor-pointer transition-all"
            >
              <p className="text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold mt-2 text-gray-800">
                {stat.title === "Transaksi"
                  ? `Rp ${stat.value.toLocaleString()}`
                  : stat.value}
              </p>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <Link href="/admin/add-menu" className="bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-xl font-semibold shadow transition-all">
          + Tambah Menu
        </Link>
        <Link href="/admin/menus" className="bg-green-600 hover:bg-green-700 text-white text-center py-3 rounded-xl font-semibold shadow transition-all">
          Lihat Semua Menu
        </Link>
        <Link href="/admin/orders" className="bg-purple-600 hover:bg-purple-700 text-white text-center py-3 rounded-xl font-semibold shadow transition-all">
          Lihat Pesanan
        </Link>
      </motion.div>
    </div>
  );
}
