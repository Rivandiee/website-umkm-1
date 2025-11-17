// src/components/customer/payment/OrderItems.tsx
"use client";

import { motion } from "framer-motion";
import { Receipt } from "lucide-react";

interface OrderItemsProps {
  orderData: {
    items: {
      name: string;
      qty: number;
      price: number;
    }[];
  };
}

export default function OrderItems({ orderData }: OrderItemsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl shadow-md p-4 sm:p-6"
    >
      <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Receipt size={20} />
        Detail Pesanan
      </h2>
      <div className="space-y-3">
        {orderData.items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-2 border-b last:border-b-0"
          >
            <div className="flex-1 min-w-0">
              <span className="text-sm sm:text-base text-gray-900 font-medium">
                {item.name}
              </span>
              <span className="text-xs sm:text-sm text-gray-500 ml-2">
                x{item.qty}
              </span>
            </div>
            <span className="font-semibold text-sm sm:text-base text-gray-900 ml-2">
              Rp {(item.price * item.qty).toLocaleString("id-ID")}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
