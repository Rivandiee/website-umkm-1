// src/components/customer/cart/CartHeader.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Trash2 } from "lucide-react";

interface CartHeaderProps {
  cartCount: number;
  onOpenClearModal: () => void;
}

export default function CartHeader({ cartCount, onOpenClearModal }: CartHeaderProps) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 bg-white shadow-md"
    >
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/customer/menu"
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={24} />
          <span className="font-medium hidden sm:inline">Kembali</span>
        </Link>
        
        <div className="flex items-center gap-2">
          <ShoppingCart size={24} className="text-gray-700" />
          <h1 className="text-lg sm:text-xl font-bold text-gray-900">Keranjang</h1>
          {cartCount > 0 && (
            <span className="px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
              {cartCount}
            </span>
          )}
        </div>
        
        {cartCount > 0 ? (
          <button
            onClick={onOpenClearModal}
            className="text-red-500 hover:text-red-700 transition-colors"
            title="Kosongkan keranjang"
          >
            <Trash2 size={20} />
          </button>
        ) : (
          <span className="w-5" />
        )}
      </div>
    </motion.div>
  );
}
