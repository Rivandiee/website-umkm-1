"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center"
      >
        <CheckCircle className="w-20 h-20 text-green-600" />

        <h1 className="text-3xl font-bold text-gray-900 mt-4">
          Pembayaran Berhasil!
        </h1>

        <p className="text-gray-600 mt-2 max-w-sm">
          Terima kasih! Pesanan kamu sedang diproses oleh dapur. Silakan tunggu sebentar.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 w-full max-w-xs"
      >
        <Link
          href="/status"
          className="block w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-medium shadow hover:bg-blue-700 transition"
        >
          Lihat Status Pesanan
        </Link>

        <Link
          href="/customer/menu"
          className="block w-full mt-3 text-blue-600 font-medium hover:underline"
        >
          Kembali ke Menu
        </Link>
      </motion.div>
    </div>
  );
}