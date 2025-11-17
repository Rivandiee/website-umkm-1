// src/components/customer/status/CustomerInfoCard.tsx
"use client";

import { motion } from "framer-motion";
import { User, MapPin } from "lucide-react";

interface CustomerInfoCardProps {
  customerName: string;
  tableNumber: string;
}

export default function CustomerInfoCard({
  customerName,
  tableNumber,
}: CustomerInfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl shadow-md p-6"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Informasi Pemesan
      </h3>
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
          <User className="text-gray-400" size={20} />
          <div>
            <p className="text-xs text-gray-500">Nama</p>
            <p className="font-semibold text-gray-900">{customerName}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
          <MapPin className="text-gray-400" size={20} />
          <div>
            <p className="text-xs text-gray-500">Nomor Meja</p>
            <p className="font-semibold text-gray-900">
              Meja {tableNumber}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
