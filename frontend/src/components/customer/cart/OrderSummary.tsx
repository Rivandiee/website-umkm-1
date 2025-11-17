// src/components/customer/cart/OrderSummary.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AlertCircle, ArrowLeft, CheckCircle } from "lucide-react";

interface OrderSummaryProps {
  subtotal: number;
  tax: number;
  total: number;
  isFormValid: boolean;
}

export default function OrderSummary({
  subtotal,
  tax,
  total,
  isFormValid,
}: OrderSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl shadow-md p-4 sm:p-6 lg:sticky lg:top-24"
    >
      <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
        Ringkasan Pesanan
      </h2>

      <div className="space-y-3 mb-4 pb-4 border-b">
        <div className="flex justify-between text-sm sm:text-base text-gray-600">
          <span>Subtotal</span>
          <span>Rp {subtotal.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between text-sm sm:text-base text-gray-600">
          <span>Pajak (10%)</span>
          <span>Rp {tax.toLocaleString("id-ID")}</span>
        </div>
      </div>

      <div className="flex justify-between text-lg sm:text-xl font-bold text-gray-900 mb-6">
        <span>Total</span>
        <span className="text-orange-600">
          Rp {total.toLocaleString("id-ID")}
        </span>
      </div>

      {!isFormValid && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
          <AlertCircle size={18} className="text-yellow-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-yellow-800">
            Mohon lengkapi nama dan nomor meja untuk melanjutkan
          </p>
        </div>
      )}

      <Link
        href={isFormValid ? "/customer/payment" : "#"}
        onClick={(e) => !isFormValid && e.preventDefault()}
        className={`block text-center py-3 sm:py-4 rounded-xl text-sm sm:text-lg font-bold shadow-lg transition-all ${
          isFormValid
            ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:shadow-xl"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        <span className="flex items-center justify-center gap-2">
          <CheckCircle size={20} />
          Lanjut ke Pembayaran
        </span>
      </Link>

      <div className="mt-4 text-center">
        <Link
          href="/customer/menu"
          className="text-xs sm:text-sm text-gray-600 hover:text-orange-600 transition-colors inline-flex items-center gap-1"
        >
          <ArrowLeft size={16} />
          Tambah item lainnya
        </Link>
      </div>
    </motion.div>
  );
}
