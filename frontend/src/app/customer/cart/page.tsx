// frontend/src/app/customer/cart/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CartItem from "../../../components/customer/cart/CartItem";
import Link from "next/link";
import { 
  ShoppingCart, 
  ArrowLeft, 
  Trash2, 
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

  const increaseQty = (id: number) =>
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );

  const decreaseQty = (id: number) =>
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
      )
    );

  const removeItem = (id: number) =>
    setCart((prev) => prev.filter((item) => item.id !== id));

  const clearCart = () => {
    setCart([]);
    setShowClearConfirm(false);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = Math.round(subtotal * 0.1); // 10% tax
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
            <span className="font-medium">Kembali</span>
          </Link>
          <div className="flex items-center gap-2">
            <ShoppingCart size={24} className="text-gray-700" />
            <h1 className="text-xl font-bold text-gray-900">Keranjang</h1>
            <span className="px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
              {cart.length}
            </span>
          </div>
          {cart.length > 0 && (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="text-red-500 hover:text-red-700 transition-colors"
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
            className="text-center py-16"
          >
            <div className="w-32 h-32 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
              <ShoppingCart size={64} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Keranjang Kosong
            </h2>
            <p className="text-gray-600 mb-6">
              Belum ada item di keranjang Anda
            </p>
            <Link
              href="/customer/menu"
              className="inline-block px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              Mulai Belanja
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Customer Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-md p-6"
              >
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                      rows={3}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Cart Items List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-md p-6"
              >
                <h2 className="text-lg font-bold text-gray-900 mb-4">
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
                      >
                        <CartItem
                          {...item}
                          onIncrease={() => increaseQty(item.id)}
                          onDecrease={() => decreaseQty(item.id)}
                          onRemove={() => removeItem(item.id)}
                          onNoteChange={(value: string) =>
                            setCart((prev) =>
                              prev.map((i) =>
                                i.id === item.id ? { ...i, note: value } : i
                              )
                            )
                          }
                        />
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
                className="bg-white rounded-2xl shadow-md p-6 sticky top-24"
              >
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Ringkasan Pesanan
                </h2>

                <div className="space-y-3 mb-4 pb-4 border-b">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Pajak (10%)</span>
                    <span>Rp {tax.toLocaleString("id-ID")}</span>
                  </div>
                </div>

                <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
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
                  className={`block text-center py-4 rounded-xl text-lg font-bold shadow-lg transition-all ${
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
                    className="text-sm text-gray-600 hover:text-orange-600 transition-colors inline-flex items-center gap-1"
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
              className="fixed inset-0 bg-black/50 z-40"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md z-50"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 size={32} className="text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Kosongkan Keranjang?
                </h3>
                <p className="text-gray-600 mb-6">
                  Semua item di keranjang akan dihapus. Tindakan ini tidak dapat
                  dibatalkan.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={clearCart}
                    className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 font-semibold transition-colors"
                  >
                    Ya, Hapus Semua
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
