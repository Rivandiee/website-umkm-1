// src/components/customer/cart/CustomerInfoForm.tsx
"use client";

import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

interface CustomerInfoFormProps {
  customerName: string;
  tableNumber: string;
  globalNote: string;
  onChangeCustomerName: (value: string) => void;
  // Menghilangkan onChangeTableNumber karena input manual tidak diperlukan lagi
  // onChangeTableNumber: (value: string) => void; 
  onChangeGlobalNote: (value: string) => void;
}

export default function CustomerInfoForm({
  customerName,
  tableNumber,
  globalNote,
  onChangeCustomerName,
  // Menghilangkan onChangeTableNumber dari destructuring props
  // onChangeTableNumber,
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
        {/* Input Nama Pemesan */}
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

        {/* Tampilan Nomor Meja (Static - dari QR) */}
<div>
  <label 
    htmlFor="table-number-display"
    className="block text-sm font-semibold text-gray-700 mb-2"
  >
    Nomor Meja *
          </label>
          <div 
            id="table-number-display"
            role="textbox"
            aria-readonly="true"
            aria-label={`Nomor meja ${tableNumber}, diambil dari QR code`}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-orange-200 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 text-gray-900 font-bold flex items-center justify-between shadow-sm"
          >
            <span className="flex items-center gap-2">
              <span className="text-orange-600 text-lg">🍽️</span>
              <span>Meja {tableNumber}</span>
            </span>
            <span className="text-xs font-medium text-orange-700 bg-orange-100 px-2.5 py-1 rounded-full border border-orange-200">
              Dari QR Code
            </span>
          </div>
          <p className="mt-1.5 text-xs text-gray-500">
            Nomor meja otomatis terdeteksi dari QR code yang Anda scan
          </p>
        </div>


        {/* Catatan Tambahan */}
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