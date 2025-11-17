// app/customer/cart/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
} from "lucide-react";

import CartHeader from "../../../components/customer/cart/CartHeader";
import CustomerInfoForm from "../../../components/customer/cart/CustomerInfoForm";
import CartItemsList, {CartItemType} from "../../../components/customer/cart/CartItemsList";
import OrderSummary from "../../../components/customer/cart/OrderSummary";
import ClearCartModal from "../../../components/customer/cart/ClearCartModal";

export default function CartPage() {
  const [cart, setCart] = useState<CartItemType[]>([
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
      <CartHeader
        cartCount={cart.length}
        onOpenClearModal={() => setShowClearConfirm(true)}
      />

      <div className="max-w-4xl mx-auto px-4 py-6">
        {cart.length === 0 ? (
          // Empty Cart State
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 sm:py-16"
          >
            <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
              {/* Bisa pakai icon ShoppingCart di sini, atau biarkan kosong dan styling saja */}
              <span className="text-gray-400 text-xs sm:text-sm">Keranjang</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              Keranjang Kosong
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              Belum ada item di keranjang Anda
            </p>
            <a
              href="/customer/menu"
              className="inline-block px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all text-sm sm:text-base"
            >
              Mulai Belanja
            </a>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-4">
              <CustomerInfoForm
                customerName={customerName}
                tableNumber={tableNumber}
                globalNote={globalNote}
                onChangeCustomerName={setCustomerName}
                onChangeTableNumber={setTableNumber}
                onChangeGlobalNote={setGlobalNote}
              />

              <CartItemsList
                cart={cart}
                showNoteInputs={showNoteInputs}
                onIncreaseQty={increaseQty}
                onDecreaseQty={decreaseQty}
                onRemoveItem={removeItem}
                onToggleNoteInput={toggleNoteInput}
                onUpdateNote={updateNote}
              />
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummary
                subtotal={subtotal}
                tax={tax}
                total={total}
                isFormValid={isFormValid}
              />
            </div>
          </div>
        )}
      </div>

      {/* Clear Cart Confirmation Modal */}
      <AnimatePresence>
        {showClearConfirm && (
          <ClearCartModal
            onClose={() => setShowClearConfirm(false)}
            onConfirm={clearCart}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
