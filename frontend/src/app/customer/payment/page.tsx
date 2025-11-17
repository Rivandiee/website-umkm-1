// frontend/src/app/customer/payment/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Wallet,
  Smartphone,
  CheckCircle,
  Clock,
  Receipt,
  User,
  MapPin,
  QrCode,
} from "lucide-react";

export default function PaymentPage() {
  // Mock data - in production, get from cart context/store
  const orderData = {
    customerName: "John Doe",
    tableNumber: "5",
    items: [
      { name: "Ayam Geprek", qty: 1, price: 20000 },
      { name: "Es Teh Manis", qty: 2, price: 5000 },
      { name: "Nasi Goreng", qty: 1, price: 25000 },
    ],
    note: "Tidak pakai cabai",
  };

  const subtotal = orderData.items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const tax = Math.round(subtotal * 0.1);
  const serviceFee = 2000;
  const total = subtotal + tax + serviceFee;

  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showQRISModal, setShowQRISModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const paymentMethods = [
    {
      id: "cash",
      name: "Tunai",
      description: "Bayar langsung di kasir setelah makan",
      icon: Wallet,
      color: "from-green-500 to-emerald-600",
      badge: "Populer",
    },
    {
      id: "qris",
      name: "QRIS",
      description: "Scan QR code untuk bayar digital",
      icon: Smartphone,
      color: "from-blue-500 to-cyan-600",
      badge: "Cepat",
    },
  ];

  const handleConfirmOrder = () => {
    if (!selectedMethod) return;
    
    if (selectedMethod === "qris") {
      setShowQRISModal(true);
    } else {
      setShowConfirmModal(true);
    }
  };

  const handleProcessPayment = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setShowConfirmModal(false);
      setShowQRISModal(false);
      setOrderSuccess(true);
    }, 2000);
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle size={40} className="text-white sm:w-12 sm:h-12" />
          </motion.div>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Pesanan Berhasil!
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6">
            Pesanan Anda sedang diproses oleh dapur
          </p>

          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm sm:text-base">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Nomor Pesanan</span>
              <span className="font-bold text-gray-900">#ORD-12345</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Metode Pembayaran</span>
              <span className="font-bold text-gray-900">
                {selectedMethod === "cash" ? "Tunai" : "QRIS"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Estimasi Selesai</span>
              <span className="font-bold text-orange-600">15-20 menit</span>
            </div>
          </div>

          {selectedMethod === "cash" && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 sm:p-4 mb-6">
              <p className="text-xs sm:text-sm text-yellow-800 font-medium">
                💰 Silakan bayar di kasir setelah selesai makan
              </p>
            </div>
          )}

          <Link
            href="/customer/status"
            className="block w-full py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-xl hover:shadow-lg transition-all mb-3 text-sm sm:text-base"
          >
            Lacak Pesanan
          </Link>

          <Link
            href="/customer/menu"
            className="block w-full py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-orange-500 hover:text-orange-600 transition-all text-sm sm:text-base"
          >
            Kembali ke Menu
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 bg-white shadow-md"
      >
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/customer/cart"
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={24} />
            <span className="font-medium hidden sm:inline">Kembali</span>
          </Link>
          <h1 className="text-lg sm:text-xl font-bold text-gray-900">Pembayaran</h1>
          <div className="w-16 sm:w-20"></div>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Info */}
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
                  <span className="font-medium text-sm sm:text-base">{orderData.customerName}</span>
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

            {/* Payment Methods */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-md p-4 sm:p-6"
            >
              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
                Pilih Metode Pembayaran
              </h2>
              <div className="space-y-4">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  const isSelected = selectedMethod === method.id;

                  return (
                    <motion.button
                      key={method.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`relative w-full p-4 sm:p-5 rounded-xl border-2 transition-all text-left ${
                        isSelected
                          ? "border-orange-500 bg-orange-50 shadow-lg"
                          : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div
                          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center flex-shrink-0`}
                        >
                          <Icon size={24} className="text-white sm:w-7 sm:h-7" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-gray-900 text-base sm:text-lg truncate">
                              {method.name}
                            </h3>
                            <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded-full flex-shrink-0">
                              {method.badge}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600">
                            {method.description}
                          </p>
                        </div>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring" }}
                            className="flex-shrink-0"
                          >
                            <CheckCircle size={24} className="text-orange-500" />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Order Items */}
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
                  <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
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
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-md p-4 sm:p-6 lg:sticky lg:top-24"
            >
              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
                Ringkasan Pembayaran
              </h2>

              <div className="space-y-3 mb-4 pb-4 border-b">
                <div className="flex justify-between text-sm sm:text-base text-gray-600">
                  <span>Subtotal</span>
                  <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base text-gray-600">
                  <span>Pajak (10%)</span>
                  <span>Rp {tax.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base text-gray-600">
                  <span>Biaya Layanan</span>
                  <span>Rp {serviceFee.toLocaleString("id-ID")}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg sm:text-xl font-bold text-gray-900 mb-6">
                <span>Total Bayar</span>
                <span className="text-orange-600">
                  Rp {total.toLocaleString("id-ID")}
                </span>
              </div>

              {selectedMethod && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                  <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-green-800 font-medium">
                    {selectedMethod === "cash" ? "Bayar di kasir" : "QRIS dipilih"}
                  </p>
                </div>
              )}

              <button
                onClick={handleConfirmOrder}
                disabled={!selectedMethod}
                className={`w-full py-3 sm:py-4 rounded-xl text-base sm:text-lg font-bold shadow-lg transition-all ${
                  selectedMethod
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:shadow-xl"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {selectedMethod === "qris" ? "Bayar Sekarang" : "Konfirmasi Pesanan"}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                <Clock size={14} />
                <span>Estimasi selesai: 15-20 menit</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>


{/* Cash Confirmation Modal - FULLY RESPONSIVE */}
<AnimatePresence>
  {showConfirmModal && (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => !isProcessing && setShowConfirmModal(false)}
        className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 bg-white rounded-2xl shadow-2xl sm:w-[calc(100%-2rem)] sm:max-w-md z-50 max-h-[calc(100vh-2rem)] overflow-y-auto"
      >
        <div className="p-5 sm:p-6">
          {isProcessing ? (
            <div className="text-center py-8 sm:py-10">
              <div className="w-14 h-14 sm:w-16 sm:h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2">
                Memproses Pesanan...
              </h3>
              <p className="text-sm sm:text-base text-gray-600">Mohon tunggu sebentar</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-5 sm:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Wallet className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  Pembayaran Tunai
                </h3>
                <p className="text-sm sm:text-base text-gray-600 px-2">
                  Pesanan akan diproses, bayar di kasir setelah selesai makan
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 sm:p-5 mb-5 sm:mb-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <span className="text-sm sm:text-base text-gray-600 font-medium">
                    Total yang harus dibayar
                  </span>
                  <span className="font-bold text-orange-600 text-xl sm:text-2xl">
                    Rp {total.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:gap-3">
                <button
                  onClick={handleProcessPayment}
                  className="w-full px-4 py-3.5 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg font-semibold transition-all text-base sm:text-lg order-1"
                >
                  Ya, Pesan Sekarang
                </button>
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="w-full px-4 py-3 sm:py-3.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-colors text-base sm:text-lg order-2"
                >
                  Batal
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>

{/* QRIS Payment Modal - FULLY RESPONSIVE */}
<AnimatePresence>
  {showQRISModal && (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => !isProcessing && setShowQRISModal(false)}
        className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 bg-white rounded-2xl shadow-2xl sm:w-[calc(100%-2rem)] sm:max-w-md z-50 max-h-[calc(100vh-2rem)] overflow-y-auto"
      >
        <div className="p-5 sm:p-6">
          {isProcessing ? (
            <div className="text-center py-8 sm:py-10">
              <div className="w-14 h-14 sm:w-16 sm:h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2">
                Menunggu Pembayaran...
              </h3>
              <p className="text-sm sm:text-base text-gray-600">Silakan selesaikan pembayaran</p>
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

              {/* QR Code Display */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 sm:p-8 mb-5 sm:mb-6">
                <div className="w-full aspect-square bg-white rounded-xl flex items-center justify-center border-4 border-blue-500 p-4">
                  <div className="text-center w-full">
                    <QrCode className="w-24 h-24 sm:w-32 sm:h-32 text-gray-300 mx-auto mb-2" />
                    <p className="text-xs sm:text-sm text-gray-400">QR Code untuk pembayaran</p>
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
                  onClick={handleProcessPayment}
                  className="w-full px-4 py-3.5 sm:py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl hover:shadow-lg font-semibold transition-all text-base sm:text-lg order-1"
                >
                  Sudah Bayar
                </button>
                <button
                  onClick={() => setShowQRISModal(false)}
                  className="w-full px-4 py-3 sm:py-3.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-colors text-base sm:text-lg order-2"
                >
                  Batal
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>

    </div>
  );
}
