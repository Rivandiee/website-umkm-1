// src/components/customer/status/StatusHeader.tsx
"use client";

import { motion } from "framer-motion";
import { RefreshCw, Sparkles } from "lucide-react";

interface StatusHeaderProps {
  orderId: string;
  isRefreshing: boolean;
  onRefresh: () => void;
}

export default function StatusHeader({
  orderId,
  isRefreshing,
  onRefresh,
}: StatusHeaderProps) {
  return (
    <div className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center"
            >
              <Sparkles size={20} className="text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Status Pesanan
              </h1>
              <p className="text-xs text-gray-500">{orderId}</p>
            </div>
          </div>
          <button
            onClick={onRefresh}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <RefreshCw
              size={20}
              className={`text-gray-600 ${isRefreshing ? "animate-spin" : ""}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
