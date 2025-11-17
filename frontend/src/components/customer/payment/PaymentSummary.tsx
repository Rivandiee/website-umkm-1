// src/components/customer/payment/PaymentSummary.tsx
"use client";

import { motion } from "framer-motion";
import { CheckCircle, Clock } from "lucide-react";

interface PaymentSummaryProps {
  subtotal: number;
  tax: number;
  serviceFee: number;
  total: number;
  selectedMethod: string | null;
  onConfirmOrder: () => void;
}

export default function PaymentSummary({
  subtotal,
  tax,
  serviceFee,
  total,
  selectedMethod,
  onConfirmOrder,
}: PaymentSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-2xl shadow-md p-4 sm:p-6 lg:sticky lg:top-24"
    >
      <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
        Ringkasan Pembayaran
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
        <div className="flex justify-between text-sm sm:text-base text-gray-600">
          <span>Biaya Layanan</span>
          <span>Rp {serviceFee.toLocaleString("id-ID")}</span>
        </div>
      </div>

      <div className="flex justify-between text-lg sm:text-xl font-bold text-gray-900 mb-6">
        <span>Total Bayar</span>
        <span className="text-orange-600">
          Rp {total.toLocaleString("id-ID")}
        </span>
      </div>

      {selectedMethod && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
          <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
          <p className="text-xs sm:text-sm text-green-800 font-medium">
            {selectedMethod === "cash" ? "Bayar di kasir" : "QRIS dipilih"}
          </p>
        </div>
      )}

      <button
        onClick={onConfirmOrder}
        disabled={!selectedMethod}
        className={`w-full py-3 sm:py-4 rounded-xl text-base sm:text-lg font-bold shadow-lg transition-all ${
          selectedMethod
            ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:shadow-xl"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {selectedMethod === "qris" ? "Bayar Sekarang" : "Konfirmasi Pesanan"}
      </button>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
        <Clock size={14} />
        <span>Estimasi selesai: 15-20 menit</span>
      </div>
    </motion.div>
  );
}
