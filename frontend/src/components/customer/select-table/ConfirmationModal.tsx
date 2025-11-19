// components/customer/select-table/ConfirmationModal.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Users, ChevronRight } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  selectedTable: number | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationModal({
  isOpen,
  selectedTable,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && selectedTable && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onCancel}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-6 text-white">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={32} />
              </div>
              <h2 className="text-2xl font-bold text-center">
                Konfirmasi Nomor Meja
              </h2>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="text-center mb-6">
                <p className="text-gray-600 mb-4">Anda memilih meja nomor:</p>
                <div className="inline-block px-8 py-4 bg-gradient-to-br from-orange-100 to-pink-100 rounded-xl border-2 border-orange-300">
                  <div className="text-5xl font-bold text-orange-600">
                    {selectedTable}
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Nomor meja ini akan digunakan untuk pesanan Anda
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={onCancel}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                >
                  Batal
                </button>
                <button
                  onClick={onConfirm}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  Lanjutkan
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
