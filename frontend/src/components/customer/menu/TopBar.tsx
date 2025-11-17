// frontend/src/components/customer/menu/TopBar.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

interface TopBarProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function TopBar({ cartCount, onCartClick }: TopBarProps) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 bg-white shadow-md"
    >
      <div className="flex items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-700" />
        </Link>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <div>
            <h1 className="font-bold text-gray-900 text-lg">UMKM Rumah Makan</h1>
            <p className="text-xs text-gray-500">Meja 5</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onCartClick}
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ShoppingCart size={24} className="text-gray-700" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
