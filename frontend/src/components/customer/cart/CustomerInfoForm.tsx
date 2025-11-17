// src/components/customer/cart/CustomerInfoForm.tsx
"use client";

import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

interface CustomerInfoFormProps {
  customerName: string;
  tableNumber: string;
  globalNote: string;
  onChangeCustomerName: (value: string) => void;
  onChangeTableNumber: (value: string) => void;
  onChangeGlobalNote: (value: string) => void;
}

export default function CustomerInfoForm({
  customerName,
  tableNumber,
  globalNote,
  onChangeCustomerName,
  onChangeTableNumber,
  onChangeGlobalNote,
}: CustomerInfoFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-md p-4 sm:p-6"
    >
      <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <AlertCircle size={20} className="text-orange-500" />
        Informasi Pemesanan
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nama Pemesan *
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => onChangeCustomerName(e.target.value)}
            placeholder="Masukkan nama Anda..."
            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nomor Meja *
          </label>
          <input
            type="text"
            value={tableNumber}
            onChange={(e) => onChangeTableNumber(e.target.value)}
            placeholder="Contoh: 12"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Catatan Tambahan (Opsional)
          </label>
          <textarea
            value={globalNote}
            onChange={(e) => onChangeGlobalNote(e.target.value)}
            placeholder="Contoh: Tidak pakai cabai, porsi besar..."
            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>
      </div>
    </motion.div>
  );
}
