// src/components/customer/payment/PaymentHeader.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PaymentHeader() {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 bg-white shadow-md"
    >
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/customer/cart"
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={24} />
          <span className="font-medium hidden sm:inline">Kembali</span>
        </Link>
        <h1 className="text-lg sm:text-xl font-bold text-gray-900">Pembayaran</h1>
        <div className="w-16 sm:w-20"></div>
      </div>
    </motion.div>
  );
}
