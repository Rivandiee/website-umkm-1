// frontend/src/components/customer/cart/EmptyCart.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12 sm:py-16"
    >
      <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
        <ShoppingCart size={48} className="text-gray-400 sm:w-16 sm:h-16" />
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
        Keranjang Kosong
      </h2>
      <p className="text-sm sm:text-base text-gray-600 mb-6">
        Belum ada item di keranjang Anda
      </p>
      <Link
        href="/customer/menu"
        className="inline-block px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all text-sm sm:text-base"
      >
        Mulai Belanja
      </Link>
    </motion.div>
  );
}
