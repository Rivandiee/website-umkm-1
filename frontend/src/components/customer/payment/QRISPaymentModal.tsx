// src/components/customer/payment/QRISPaymentModal.tsx
"use client";

import { motion } from "framer-motion";
import { QrCode } from "lucide-react";

interface QRISPaymentModalProps {
  total: number;
  isProcessing: boolean;
  onClose: () => void;
  onProcessPayment: () => void;
}

export default function QRISPaymentModal({
  total,
  isProcessing,
  onClose,
  onProcessPayment,
}: QRISPaymentModalProps) {
  const handleBackdropClick = () => {
    if (!isProcessing) onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick}
        className="fixed inset-0 bg-black/50 z-40"
      />

      {/* Wrapper yang memastikan konten di tengah */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Box modal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[calc(100vh-2rem)] overflow-y-auto"
        >
          <div className="p-5 sm:p-6">
            {isProcessing ? (
              <div className="text-center py-8 sm:py-10">
                <div className="w-14 h-14 sm:w-16 sm:h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2">
                  Menunggu Pembayaran...
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Silakan selesaikan pembayaran
                </p>
              </div>
            ) : (
              <>
                <div className="text-center mb-5 sm:mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <QrCode className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">
                    Scan QR Code
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 px-2">
                    Gunakan aplikasi e-wallet atau mobile banking Anda
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 sm:p-8 mb-5 sm:mb-6">
                  <div className="w-full aspect-square bg-white rounded-xl flex items-center justify-center border-4 border-blue-500 p-4">
                    <div className="text-center w-full">
                      <QrCode className="w-24 h-24 sm:w-32 sm:h-32 text-gray-300 mx-auto mb-2" />
                      <p className="text-xs sm:text-sm text-gray-400">
                        QR Code untuk pembayaran
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 sm:p-5 mb-5 sm:mb-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <span className="text-sm sm:text-base text-gray-600 font-medium">
                      Total Pembayaran
                    </span>
                    <span className="font-bold text-blue-600 text-xl sm:text-2xl">
                      Rp {total.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:gap-3">
                  <button
                    onClick={onProcessPayment}
                    className="w-full px-4 py-3.5 sm:py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl hover:shadow-lg font-semibold transition-all text-base sm:text-lg order-1"
                  >
                    Sudah Bayar
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full px-4 py-3 sm:py-3.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-colors text-base sm:text-lg order-2"
                  >
                    Batal
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
