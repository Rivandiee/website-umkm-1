// src/components/customer/payment/OrderSuccessView.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, Clock } from "lucide-react";

interface OrderSuccessViewProps {
  selectedMethod: string | null;
}

export default function OrderSuccessView({ selectedMethod }: OrderSuccessViewProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle size={40} className="text-white sm:w-12 sm:h-12" />
        </motion.div>

        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Pesanan Berhasil!
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mb-6">
          Pesanan Anda sedang diproses oleh dapur
        </p>

        <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm sm:text-base">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Nomor Pesanan</span>
            <span className="font-bold text-gray-900">#ORD-12345</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Metode Pembayaran</span>
            <span className="font-bold text-gray-900">
              {selectedMethod === "cash" ? "Tunai" : "QRIS"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Estimasi Selesai</span>
            <span className="font-bold text-orange-600">15-20 menit</span>
          </div>
        </div>

        {selectedMethod === "cash" && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 sm:p-4 mb-6">
            <p className="text-xs sm:text-sm text-yellow-800 font-medium">
              💰 Silakan bayar di kasir setelah selesai makan
            </p>
          </div>
        )}

        <Link
          href="/customer/status"
          className="block w-full py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-xl hover:shadow-lg transition-all mb-3 text-sm sm:text-base"
        >
          Lacak Pesanan
        </Link>

        <Link
          href="/customer/menu"
          className="block w-full py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-orange-500 hover:text-orange-600 transition-all text-sm sm:text-base"
        >
          Kembali ke Menu
        </Link>
      </motion.div>
    </div>
  );
}
