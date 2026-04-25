"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag, ChevronRight } from "lucide-react";
import api from "../../../lib/axios";
import { useState } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string | null;
  quantity: number;
  discount?: number;
}

interface CartProps {
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
  showCart: boolean;
  setShowCart: (show: boolean) => void;
  tableNumber?: number | string;
}

export default function Cart({
  cartItems,
  setCartItems,
  showCart,
  setShowCart,
  tableNumber = 5,
}: CartProps) {
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const getImageUrl = (path: string | null) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return `${process.env.NEXT_PUBLIC_IMAGE_URL}/${path.split("/").pop()}`;
  };

  const getItemPrice = (item: CartItem) =>
    item.discount
      ? item.price - (item.price * item.discount) / 100
      : item.price;

  const total = cartItems.reduce(
    (sum, item) => sum + getItemPrice(item) * item.quantity,
    0
  );

  const handleOrder = async () => {
    if (isOrdering) return;
    setIsOrdering(true);
    try {
      await api.post("/customer/orders", {
        tableNumber,
        items: cartItems.map((item) => ({
          menuId: item.id,
          quantity: item.quantity,
        })),
      });
      setOrderSuccess(true);
      setCartItems([]);
      setTimeout(() => {
        setOrderSuccess(false);
        setShowCart(false);
      }, 2000);
    } catch (error) {
      console.error("Gagal membuat order:", error);
      alert("Gagal membuat pesanan, coba lagi.");
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <AnimatePresence>
      {showCart && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCart(false)}
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 h-[90vh] bg-white z-50 flex flex-col rounded-t-3xl shadow-2xl"
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-gray-200" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-orange-500" />
                <h2 className="text-base font-semibold text-gray-900">
                  Keranjang
                </h2>
                {cartItems.length > 0 && (
                  <span className="text-xs bg-orange-100 text-orange-600 font-semibold px-2 py-0.5 rounded-full">
                    {cartItems.length} item
                  </span>
                )}
              </div>
              <button
                onClick={() => setShowCart(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <X size={16} className="text-gray-600" />
              </button>
            </div>

            {/* Success State */}
            <AnimatePresence>
              {orderSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white rounded-t-3xl"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <span className="text-3xl">🎉</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Pesanan Diterima!
                  </h3>
                  <p className="text-sm text-gray-500">
                    Pesanan kamu sedang diproses
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-3">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                    <ShoppingBag size={28} className="text-gray-300" />
                  </div>
                  <p className="text-gray-500 text-sm">Keranjang kamu kosong</p>
                  <p className="text-gray-400 text-xs mt-1">
                    Tambahkan menu yang kamu suka
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => {
                    const imgUrl = getImageUrl(item.image);
                    const itemPrice = getItemPrice(item);
                    return (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex gap-3 p-3 bg-gray-50 rounded-2xl"
                      >
                        {/* Gambar */}
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0">
                          {imgUrl ? (
                            <img
                              src={imgUrl}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xl">
                              🍽️
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 text-sm truncate">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-1 mt-0.5">
                            <span className="text-orange-500 font-semibold text-sm">
                              Rp {itemPrice.toLocaleString("id-ID")}
                            </span>
                            {item.discount && (
                              <span className="text-xs text-gray-400 line-through">
                                Rp {item.price.toLocaleString("id-ID")}
                              </span>
                            )}
                          </div>

                          {/* Quantity controls */}
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-6 h-6 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-sm font-semibold w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-6 h-6 rounded-lg bg-orange-500 flex items-center justify-center hover:bg-orange-600 transition-colors"
                            >
                              <Plus size={12} className="text-white" />
                            </button>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="ml-auto w-6 h-6 rounded-lg bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors"
                            >
                              <Trash2 size={12} className="text-red-400" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="px-5 py-4 border-t border-gray-100 bg-white">
                {/* Subtotal */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">Total pembayaran</span>
                  <span className="text-lg font-bold text-gray-900">
                    Rp {total.toLocaleString("id-ID")}
                  </span>
                </div>

                {/* Order button */}
                <button
                  onClick={handleOrder}
                  disabled={isOrdering}
                  className="w-full h-12 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold rounded-2xl flex items-center justify-center gap-2 transition-colors"
                >
                  {isOrdering ? (
                    <span className="text-sm">Memproses...</span>
                  ) : (
                    <>
                      <span className="text-sm">Pesan Sekarang</span>
                      <ChevronRight size={16} />
                    </>
                  )}
                </button>

                
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}