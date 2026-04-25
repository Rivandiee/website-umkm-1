"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";

interface TopBarProps {
  cartCount: number;
  onCartClick: () => void;
  tableNumber?: string | number;
  restoName?: string;
}

export default function TopBar({
  cartCount,
  onCartClick,
  tableNumber = 5,
  restoName = "Rumah Makan",
}: TopBarProps) {
  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="sticky top-0 z-40 bg-white border-b border-gray-100"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)" }}
    >
      <div className="flex items-center justify-between px-5 h-[60px]">
        
        {/* Back Button */}
        <Link
          href="/"
          className="w-9 h-9 flex items-center justify-center rounded-[10px] border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft size={16} className="text-gray-700" />
        </Link>

        {/* Center Info */}
        <div className="flex flex-col items-center gap-0.5">
          <span
            className="text-gray-900 leading-none"
            style={{ fontFamily: "Georgia, serif", fontSize: "16px" }}
          >
            {restoName}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-gray-400">
            <span className="w-[5px] h-[5px] rounded-full bg-green-500 inline-block" />
            Meja {tableNumber} · Buka
          </span>
        </div>

        {/* Cart Button */}
        <button
          onClick={onCartClick}
          className="w-9 h-9 flex items-center justify-center rounded-[10px] border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors relative"
        >
          <ShoppingBag size={17} className="text-gray-700" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-[17px] h-[17px] bg-orange-500 text-white text-[10px] font-semibold rounded-full flex items-center justify-center border-2 border-white">
              {cartCount}
            </span>
          )}
        </button>

      </div>
    </motion.div>
  );
}