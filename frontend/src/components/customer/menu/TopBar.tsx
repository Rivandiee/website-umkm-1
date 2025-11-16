"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

interface TopBarProps {
  cartCount?: number;
}

export default function TopBar({ cartCount = 0 }: TopBarProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white shadow-md py-3 px-4 flex justify-between items-center sticky top-0 z-50"
    >
      {/* Title */}
      <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
        Menu
      </h1>

      {/* Cart Button */}
      <Link href="/customer/cart" className="relative">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full bg-white shadow hover:shadow-lg transition-all"
        >
          <ShoppingCart size={26} className="text-gray-700" />
        </motion.button>

        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
            {cartCount}
          </span>
        )}
      </Link>
    </motion.header>
  );
}
