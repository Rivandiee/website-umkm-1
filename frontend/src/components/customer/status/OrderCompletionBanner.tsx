// src/components/customer/status/OrderCompletionBanner.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle } from "lucide-react";


interface OrderCompletionBannerProps {
  orderStatus: "PENDING" | "IN_PROGRESS" | "DONE";
}

export default function OrderCompletionBanner({
  orderStatus,
}: OrderCompletionBannerProps) {
  return (
    <AnimatePresence>
      {orderStatus === "DONE" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-6 text-white text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle size={64} className="mx-auto mb-4" />
          </motion.div>
          <h3 className="text-2xl font-bold mb-2">Selamat Menikmati!</h3>
          <p className="text-white/90 mb-4">
            Pesanan Anda telah sampai. Terima kasih telah memesan!
          </p>
          <Link
            href="/customer/rating"
            className="inline-block px-6 py-3 bg-white text-green-600 font-bold rounded-xl hover:shadow-lg transition-all"
          >
            Beri Rating
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
