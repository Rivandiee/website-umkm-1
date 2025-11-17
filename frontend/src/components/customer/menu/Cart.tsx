// frontend/src/components/customer/menu/Cart.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";

interface CartProps {
  cartItems: any[];
  setCartItems: (items: any[]) => void;
  showCart: boolean;
  setShowCart: (show: boolean) => void;
}

export default function Cart({
  cartItems,
  setCartItems,
  showCart,
  setShowCart,
}: CartProps) {
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

  const total = cartItems.reduce((sum, item) => {
    const price = item.discount
      ? item.price - (item.price * item.discount) / 100
      : item.price;
    return sum + price * item.quantity;
  }, 0);

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
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Cart Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-orange-500 to-pink-500">
              <div className="flex items-center gap-2 text-white">
                <ShoppingBag size={24} />
                <h2 className="text-xl font-bold">Keranjang</h2>
              </div>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={24} className="text-white" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <ShoppingBag size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>Keranjang Anda kosong</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-gray-50 rounded-xl p-4 flex gap-4"
                    >
                      <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0"></div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          Rp{" "}
                          {(item.discount
                            ? item.price - (item.price * item.discount) / 100
                            : item.price
                          ).toLocaleString("id-ID")}
                        </p>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 bg-white rounded-lg hover:bg-gray-100"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 bg-white rounded-lg hover:bg-gray-100"
                          >
                            <Plus size={16} />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-auto p-1 text-red-500 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-4 border-t bg-white">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Total</span>
                  <span className="text-2xl font-bold text-gray-900">
                    Rp {total.toLocaleString("id-ID")}
                  </span>
                </div>
                <button className="w-full py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-xl hover:shadow-lg transition-all">
                  Pesan Sekarang
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
