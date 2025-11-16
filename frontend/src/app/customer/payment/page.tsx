"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PaymentPage() {
  const total = 35000; // contoh static, nanti dari cart

  return (
    <div className="min-h-screen p-5 max-w-xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-5"
      >
        Pembayaran
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-4 rounded-xl shadow"
      >
        <h2 className="text-lg font-semibold mb-3">Ringkasan</h2>

        <div className="flex justify-between mb-2">
          <span>Total Pesanan</span>
          <span className="font-semibold">Rp {total.toLocaleString()}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>Pajak (10%)</span>
          <span>Rp {(total * 0.1).toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-lg font-bold mt-4 pt-3 border-t">
          <span>Total Bayar</span>
          <span>
            Rp {(total + total * 0.1).toLocaleString()}
          </span>
        </div>
      </motion.div>

      <Link
        href="/customer/payment/method"
        className="block mt-6 bg-blue-600 text-white text-center py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
      >
        Pilih Metode Pembayaran
      </Link>

      <Link
        href="/customer/cart"
        className="block text-center mt-3 text-gray-500 underline"
      >
        Kembali ke Keranjang
      </Link>
    </div>
  );
}
