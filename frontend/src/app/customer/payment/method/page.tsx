"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CreditCard, Wallet } from "lucide-react";

export default function PaymentMethodPage() {
  return (
    <div className="min-h-screen p-5 max-w-xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-5"
      >
        Metode Pembayaran
      </motion.h1>

      <div className="space-y-4">
        {/* CASH */}
        <Link
          href="/customer/payment/confirm?method=cash"
          className="flex items-center gap-3 p-4 bg-white rounded-xl shadow hover:bg-gray-50"
        >
          <Wallet size={28} className="text-blue-600" />
          <div>
            <h3 className="font-semibold">Bayar Tunai</h3>
            <p className="text-gray-500 text-sm">
              Pembayaran dilakukan langsung ke kasir.
            </p>
          </div>
        </Link>

        {/* NON-CASH */}
        <Link
          href="/customer/payment/confirm?method=noncash"
          className="flex items-center gap-3 p-4 bg-white rounded-xl shadow hover:bg-gray-50"
        >
          <CreditCard size={28} className="text-green-600" />
          <div>
            <h3 className="font-semibold">Non-Tunai</h3>
            <p className="text-gray-500 text-sm">
              Transfer bank / QRIS / E-Wallet.
            </p>
          </div>
        </Link>
      </div>

      <Link
        href="/customer/payment"
        className="block text-center mt-5 text-gray-500 underline"
      >
        Kembali
      </Link>
    </div>
  );
}
