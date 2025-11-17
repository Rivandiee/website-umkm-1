// frontend/src/components/customer/cart/ClearCartModal.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react";

interface ClearCartModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ClearCartModal({
  show,
  onClose,
  onConfirm,
}: ClearCartModalProps) {
  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 bg-white rounded-2xl shadow-2xl sm:w-[calc(100%-2rem)] sm:max-w-md z-50 max-h-[calc(100vh-2rem)] overflow-y-auto"
          >
            <div className="p-5 sm:p-6">
              <div className="text-center">
                {/* Icon */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" />
                </div>
                
                {/* Title */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  Kosongkan Keranjang?
                </h3>
                
                {/* Description */}
                <p className="text-sm sm:text-base text-gray-600 mb-6 px-2">
                  Semua item di keranjang akan dihapus. Tindakan ini tidak dapat dibatalkan.
                </p>
                
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={onClose}
                    className="w-full sm:flex-1 px-4 py-3 sm:py-3.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-colors text-sm sm:text-base order-2 sm:order-1"
                  >
                    Batal
                  </button>
                  <button
                    onClick={onConfirm}
                    className="w-full sm:flex-1 px-4 py-3 sm:py-3.5 bg-red-600 text-white rounded-xl hover:bg-red-700 font-semibold transition-colors text-sm sm:text-base order-1 sm:order-2"
                  >
                    Ya, Hapus Semua
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
