"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CartItem from "../../../components/customer/cart/CartItem";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Ayam Geprek",
      price: 20000,
      qty: 1,
      note: "Pedas sedang",
      image: "/ayam.jpg",
    },
    {
      id: 2,
      name: "Es Teh Manis",
      price: 5000,
      qty: 2,
      note: "",
      image: "/esteh.jpg",
    },
  ]);

  const increaseQty = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateNote = (id: number, value: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, note: value } : item
      )
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="min-h-screen p-5 max-w-xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-4"
      >
        Keranjang Pesanan
      </motion.h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <CartItem
            key={item.id}
            {...item}
            onIncrease={() => increaseQty(item.id)}
            onDecrease={() => decreaseQty(item.id)}
            onRemove={() => removeItem(item.id)}
            onNoteChange={(value) => updateNote(item.id, value)}
          />
        ))}
      </div>

      <div className="mt-6 bg-white p-4 shadow rounded-xl">
        <div className="flex justify-between text-xl font-semibold">
          <span>Total</span>
          <span>Rp {total.toLocaleString()}</span>
        </div>
      </div>

      <Link
        href="/customer/success"
        className="block mt-5 bg-blue-600 text-white text-center py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
      >
        Checkout
      </Link>

      <Link
        href="/customer/menu"
        className="block text-center mt-3 text-gray-500 underline"
      >
        Kembali ke Menu
      </Link>
    </div>
  );
}
