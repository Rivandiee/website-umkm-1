"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ConfirmPaymentPage() {
  const params = useSearchParams();
  const method = params.get("method");

  return (
    <div className="min-h-screen p-5 max-w-xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-4"
      >
        Konfirmasi Pembayaran
      </motion.h1>

      <div className="bg-white p-4 shadow rounded-xl">
        <p className="text-gray-600 mb-4">
          Metode Pembayaran:{" "}
          <span className="font-semibold uppercase">{method}</span>
        </p>

        {method === "noncash" ? (
          <div className="text-center">
            <img
              src="/qris-sample.png"
              className="w-48 mx-auto rounded-lg"
              alt="QRIS"
            />
            <p className="text-sm text-gray-500 mt-2">
              Scan QR untuk melakukan pembayaran.
            </p>
          </div>
        ) : (
          <p className="text-gray-500">
            Silakan lakukan pembayaran tunai kepada kasir.
          </p>
        )}
      </div>

      <Link
        href="/customer/success"
        className="block mt-6 bg-green-600 text-white text-center py-3 rounded-xl text-lg font-semibold hover:bg-green-700 transition"
      >
        Selesaikan Pembayaran
      </Link>

      <Link
        href="/customer/payment/method"
        className="block text-center mt-3 text-gray-500 underline"
      >
        Kembali
      </Link>
    </div>
  );
}
