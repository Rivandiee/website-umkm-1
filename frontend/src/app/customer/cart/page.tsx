// frontend/src/app/customer/cart/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft, 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  MessageSquare,
  AlertCircle,
  CheckCircle
} from "lucide-react";

export default function CartPage() {
  const [cart, setCart] = useState([
    { 
      id: 1, 
      name: "Ayam Geprek", 
      price: 20000, 
      qty: 1, 
      image: "/ayam.jpg", 
      note: "",
      category: "Makanan"
    },
    { 
      id: 2, 
      name: "Es Teh Manis", 
      price: 5000, 
      qty: 2, 
      image: "/esteh.jpg", 
      note: "",
      category: "Minuman"
    },
  ]);

  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [globalNote, setGlobalNote] = useState("");
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showNoteInputs, setShowNoteInputs] = useState<{ [key: number]: boolean }>({});

  const increaseQty = (id: number) =>
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item));

  const decreaseQty = (id: number) =>
    setCart(prev => prev.map(item => item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item));

  const removeItem = (id: number) => 
    setCart(prev => prev.filter(item => item.id !== id));

  const clearCart = () => {
    setCart([]);
    setShowClearConfirm(false);
  };

  const updateNote = (id: number, note: string) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, note } : item));
  };

  const toggleNoteInput = (id: number) => {
    setShowNoteInputs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  const isFormValid = customerName.trim() !== "" && tableNumber.trim() !== "";

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
            href="/customer/menu"
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={24} />
            <span className="font-medium hidden sm:inline">Kembali</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <ShoppingCart size={24} className="text-gray-700" />
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">Keranjang</h1>
            {cart.length > 0 && (
              <span className="px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
                {cart.length}
              </span>
            )}
          </div>
          
          {cart.length > 0 && (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="text-red-500 hover:text-red-700 transition-colors"
              title="Kosongkan keranjang"
            >
              <Trash2 size={20} />
            </button>
          )}
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {cart.length === 0 ? (
          // Empty Cart State
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 sm:py-16"
          >
            <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
              <ShoppingCart size={48} className="text-gray-400 sm:w-16 sm:h-16" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              Keranjang Kosong
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              Belum ada item di keranjang Anda
            </p>
            <Link
              href="/customer/menu"
              className="inline-block px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all text-sm sm:text-base"
            >
              Mulai Belanja
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-4">
              {/* Customer Info */}
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
                      onChange={(e) => setCustomerName(e.target.value)}
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
                      onChange={(e) => setTableNumber(e.target.value)}
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
                      onChange={(e) => setGlobalNote(e.target.value)}
                      placeholder="Contoh: Tidak pakai cabai, porsi besar..."
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                      rows={3}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Cart Items */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-md p-4 sm:p-6"
              >
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
                  Item Pesanan ({cart.length})
                </h2>
                <div className="space-y-4">
                  <AnimatePresence>
                    {cart.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="bg-gray-50 rounded-xl p-3 sm:p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex gap-3 sm:gap-4">
                          {/* Image */}
                          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex-shrink-0 flex items-center justify-center">
                            <span className="text-gray-400 text-xs">IMG</span>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-gray-900 text-sm sm:text-base truncate">
                                  {item.name}
                                </h3>
                                <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full inline-block mt-1">
                                  {item.category}
                                </span>
                              </div>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-2 flex-shrink-0"
                              >
                                <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                              </button>
                            </div>

                            <div className="text-base sm:text-lg font-bold text-orange-600 mb-3">
                              Rp {(item.price * item.qty).toLocaleString("id-ID")}
                              <span className="text-xs sm:text-sm text-gray-500 font-normal ml-2">
                                (Rp {item.price.toLocaleString("id-ID")} x {item.qty})
                              </span>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 sm:gap-3 bg-white rounded-lg p-1">
                                <button
                                  onClick={() => decreaseQty(item.id)}
                                  className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                  <Minus size={14} className="sm:w-4 sm:h-4" />
                                </button>
                                <span className="font-bold text-gray-900 w-6 sm:w-8 text-center text-sm sm:text-base">
                                  {item.qty}
                                </span>
                                <button
                                  onClick={() => increaseQty(item.id)}
                                  className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                  <Plus size={14} className="sm:w-4 sm:h-4" />
                                </button>
                              </div>

                              <button
                                onClick={() => toggleNoteInput(item.id)}
                                className={`flex items-center gap-1 text-xs sm:text-sm font-medium px-2 sm:px-3 py-2 rounded-lg transition-colors ${
                                  item.note || showNoteInputs[item.id]
                                    ? "bg-orange-100 text-orange-600"
                                    : "bg-white text-gray-600 hover:bg-gray-100"
                                }`}
                              >
                                <MessageSquare size={14} className="sm:w-4 sm:h-4" />
                                <span className="hidden sm:inline">Catatan</span>
                              </button>
                            </div>

                            {/* Note Input */}
                            {showNoteInputs[item.id] && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="mt-3"
                              >
                                <textarea
                                  value={item.note}
                                  onChange={(e) => updateNote(item.id, e.target.value)}
                                  placeholder="Tambahkan catatan untuk item ini..."
                                  className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                                  rows={2}
                                />
                              </motion.div>
                            )}

                            {item.note && !showNoteInputs[item.id] && (
                              <div className="mt-2 text-xs text-gray-600 italic bg-yellow-50 px-3 py-2 rounded-lg">
                                📝 {item.note}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-md p-4 sm:p-6 lg:sticky lg:top-24"
              >
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
                  Ringkasan Pesanan
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
                </div>

                <div className="flex justify-between text-lg sm:text-xl font-bold text-gray-900 mb-6">
                  <span>Total</span>
                  <span className="text-orange-600">
                    Rp {total.toLocaleString("id-ID")}
                  </span>
                </div>

                {!isFormValid && (
                  <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
                    <AlertCircle size={18} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-yellow-800">
                      Mohon lengkapi nama dan nomor meja untuk melanjutkan
                    </p>
                  </div>
                )}

                <Link
                  href={isFormValid ? "/customer/payment" : "#"}
                  onClick={(e) => !isFormValid && e.preventDefault()}
                  className={`block text-center py-3 sm:py-4 rounded-xl text-sm sm:text-lg font-bold shadow-lg transition-all ${
                    isFormValid
                      ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:shadow-xl"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle size={20} />
                    Lanjut ke Pembayaran
                  </span>
                </Link>

                <div className="mt-4 text-center">
                  <Link
                    href="/customer/menu"
                    className="text-xs sm:text-sm text-gray-600 hover:text-orange-600 transition-colors inline-flex items-center gap-1"
                  >
                    <ArrowLeft size={16} />
                    Tambah item lainnya
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>

      {/* Clear Cart Confirmation Modal */}
      <AnimatePresence>
        {showClearConfirm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowClearConfirm(false)}
              className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 bg-white rounded-2xl shadow-2xl sm:w-[calc(100%-2rem)] sm:max-w-md z-50 max-h-[calc(100vh-2rem)] overflow-y-auto"
            >
              <div className="p-5 sm:p-6">
                <div className="text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trash2 className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" />
                  </div>
                  
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">
                    Kosongkan Keranjang?
                  </h3>
                  
                  <p className="text-sm sm:text-base text-gray-600 mb-6 px-2">
                    Semua item di keranjang akan dihapus. Tindakan ini tidak dapat dibatalkan.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setShowClearConfirm(false)}
                      className="w-full sm:flex-1 px-4 py-3 sm:py-3.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-colors text-sm sm:text-base order-2 sm:order-1"
                    >
                      Batal
                    </button>
                    <button
                      onClick={clearCart}
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
    </div>
  );
}
