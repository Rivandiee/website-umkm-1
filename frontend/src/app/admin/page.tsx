"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminDashboardPage() {
  const stats = [
    { id: 1, title: "Menu", value: 12, href: "/admin/menus", color: "bg-blue-100 text-blue-800" },
    { id: 2, title: "Pesanan Hari Ini", value: 5, href: "/admin/orders", color: "bg-purple-100 text-purple-800" },
    { id: 3, title: "Transaksi", value: 150000, href: "/admin/transactions", color: "bg-yellow-100 text-yellow-800" },
  ];

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6 text-gray-800"
      >
        Dashboard Admin
      </motion.h1>

      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link key={stat.id} href={stat.href}>
            <motion.div whileHover={{ scale: 1.05 }} className={`p-5 rounded-2xl shadow-lg cursor-pointer ${stat.color}`}>
              <p className="font-medium">{stat.title}</p>
              <p className="text-2xl font-bold mt-2">
                {stat.title === "Transaksi" ? `Rp ${stat.value.toLocaleString()}` : stat.value}
              </p>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
