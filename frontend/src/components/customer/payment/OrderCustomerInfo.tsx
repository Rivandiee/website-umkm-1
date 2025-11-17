// src/components/customer/payment/OrderCustomerInfo.tsx
"use client";

import { motion } from "framer-motion";
import { User, MapPin } from "lucide-react";

interface OrderCustomerInfoProps {
  orderData: {
    customerName: string;
    tableNumber: number;
    note?: string;
  };
}

export default function OrderCustomerInfo({ orderData }: OrderCustomerInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-md p-4 sm:p-6"
    >
      <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
        Informasi Pemesanan
      </h2>
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-gray-700">
          <User size={20} className="text-gray-400 flex-shrink-0" />
          <span className="font-medium text-sm sm:text-base">
            {orderData.customerName}
          </span>
        </div>
        <div className="flex items-center gap-3 text-gray-700">
          <MapPin size={20} className="text-gray-400 flex-shrink-0" />
          <span className="text-sm sm:text-base">Meja {orderData.tableNumber}</span>
        </div>
        {orderData.note && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-3">
            <p className="text-xs sm:text-sm text-yellow-800">
              📝 Catatan: {orderData.note}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
