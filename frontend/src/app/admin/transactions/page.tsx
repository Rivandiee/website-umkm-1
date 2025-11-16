// frontend/src/app/admin/transactions/page.tsx
"use client";

import { motion } from "framer-motion";
import { DollarSign } from "lucide-react";

export default function AdminTransactionsPage() {
  const dummyTransactions = [
    { id: 1, orderId: 101, amount: 49500, method: "NONCASH", date: "2025-11-16 14:30" },
    { id: 2, orderId: 102, amount: 22000, method: "CASH", date: "2025-11-16 15:15" },
    { id: 3, orderId: 103, amount: 82500, method: "CASH", date: "2025-11-16 16:00" },
  ];

  const totalSales = dummyTransactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Riwayat Transaksi & Penjualan
      </h1>

      {/* Sales Summary Card */}
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-5 rounded-2xl shadow-lg mb-6 border-b-4 border-green-500 flex items-center gap-4"
      >
        <DollarSign size={36} className="text-green-600" />
        <div>
            <h2 className="text-lg font-semibold text-gray-600">Total Penjualan Hari Ini</h2>
            <p className="text-3xl font-extrabold text-green-600 mt-1">
              Rp {totalSales.toLocaleString()}
            </p>
        </div>
      </motion.div>

      {/* Transaction List */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Daftar Transaksi</h2>
        <div className="space-y-3">
          {dummyTransactions.map(t => (
            <div key={t.id} className="flex justify-between items-center p-3 border-b last:border-b-0 hover:bg-gray-50 rounded-lg transition-colors">
              <div>
                <p className="font-medium">Trx ID: {t.id} (Order #{t.orderId})</p>
                <p className="text-sm text-gray-500">{t.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">Rp {t.amount.toLocaleString()}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${t.method === 'CASH' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                  {t.method}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}