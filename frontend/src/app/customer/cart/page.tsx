"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CartItem from "../../../components/customer/cart/CartItem";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState([
    { id: 1, name: "Ayam Geprek", price: 20000, qty: 1, image: "/ayam.jpg", note: "" },
    { id: 2, name: "Es Teh Manis", price: 5000, qty: 2, image: "/esteh.jpg", note: "" },
  ]);

  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [globalNote, setGlobalNote] = useState("");

  const increaseQty = (id: number) =>
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item));

  const decreaseQty = (id: number) =>
    setCart(prev => prev.map(item => item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item));

  const removeItem = (id: number) => setCart(prev => prev.filter(item => item.id !== id));

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="min-h-screen p-5 max-w-xl mx-auto">
      <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold mb-6 text-gray-800">
        🛒 Keranjang Pesanan
      </motion.h1>

      {/* Customer Info */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="bg-white shadow-lg p-5 rounded-2xl mb-6 space-y-4">
        <div>
          <label className="font-medium text-gray-700">Nama Customer</label>
          <input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="Masukkan nama..." className="mt-1 w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <div>
          <label className="font-medium text-gray-700">Nomor Meja</label>
          <input type="text" value={tableNumber} onChange={e => setTableNumber(e.target.value)} placeholder="Contoh: 12" className="mt-1 w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <div>
          <label className="font-medium text-gray-700">Catatan</label>
          <textarea value={globalNote} onChange={e => setGlobalNote(e.target.value)} placeholder="Catatan tambahan..." className="mt-1 w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" rows={3}></textarea>
        </div>
      </motion.div>

      {/* Cart Items */}
      <AnimatePresence>
        {cart.map(item => (
          <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
            <CartItem
              {...item}
              onIncrease={() => increaseQty(item.id)}
              onDecrease={() => decreaseQty(item.id)}
              onRemove={() => removeItem(item.id)}
              onNoteChange={(value: string) =>
                setCart(prev => prev.map(i => (i.id === item.id ? { ...i, note: value } : i)))
              }
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Total */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 bg-white p-5 shadow-lg rounded-2xl flex justify-between items-center text-xl font-semibold">
        <span>Total</span>
        <span>Rp {total.toLocaleString()}</span>
      </motion.div>

      {/* Checkout */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mt-6 space-y-3">
        <Link href="/customer/payment" className="block bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-xl text-lg font-semibold shadow transition-all">
          ✅ Checkout
        </Link>
        <Link href="/customer/menu" className="block text-center text-gray-500 underline">
          ← Kembali ke Menu
        </Link>
      </motion.div>
    </div>
  );
}
