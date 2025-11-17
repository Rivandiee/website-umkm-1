// src/components/customer/status/OrderItemsCard.tsx
"use client";

import { motion } from "framer-motion";

interface OrderItemsCardProps {
  orderItems: {
    id: string;
    name: string;
    qty: number;
    price: number;
  }[];
  total: number;
}

export default function OrderItemsCard({
  orderItems,
  total,
}: OrderItemsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-2xl shadow-md p-6"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Detail Pesanan
      </h3>
      <div className="space-y-3">
        {orderItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="flex justify-between items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="flex-1">
              <p className="font-medium text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-500">Quantity: {item.qty}</p>
            </div>
            <p className="font-bold text-gray-900">
              Rp {(item.price * item.qty).toLocaleString("id-ID")}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
        <span className="text-lg font-bold text-gray-900">
          Total Bayar
        </span>
        <span className="text-2xl font-bold text-orange-600">
          Rp {total.toLocaleString("id-ID")}
        </span>
      </div>
    </motion.div>
  );
}
