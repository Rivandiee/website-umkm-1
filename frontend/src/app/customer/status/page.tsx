"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface OrderItem {
  id: number;
  name: string;
  qty: number;
  price: number;
}

export default function StatusPage() {
  // Contoh data pesanan (dummy)
  const [orderStatus, setOrderStatus] = useState<"PENDING" | "PREPARING" | "DONE">("PENDING");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    { id: 1, name: "Ayam Geprek", qty: 1, price: 20000 },
    { id: 2, name: "Es Teh Manis", qty: 2, price: 5000 },
  ]);
  const [customerName] = useState("Budi");
  const [tableNumber] = useState("12");

  const total = orderItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Simulasi update status pesanan
  useEffect(() => {
    const timer = setTimeout(() => setOrderStatus("PREPARING"), 3000);
    const timer2 = setTimeout(() => setOrderStatus("DONE"), 6000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  // Warna badge status
  const statusColor = {
    PENDING: "bg-yellow-200 text-yellow-800",
    PREPARING: "bg-blue-200 text-blue-800",
    DONE: "bg-green-200 text-green-800",
  };

  return (
    <div className="min-h-screen p-5 max-w-xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-4 text-gray-800"
      >
        Status Pesanan
      </motion.h1>

      {/* Customer Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white shadow-lg p-4 rounded-xl mb-5 space-y-2"
      >
        <p className="font-medium">Nama Customer: <span className="font-normal">{customerName}</span></p>
        <p className="font-medium">Nomor Meja: <span className="font-normal">{tableNumber}</span></p>
        <p className={`inline-block px-3 py-1 rounded-full font-semibold ${statusColor[orderStatus]}`}>
          {orderStatus}
        </p>
      </motion.div>

      {/* Order Items */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="bg-white shadow-lg p-4 rounded-xl space-y-3">
        {orderItems.map(item => (
          <div key={item.id} className="flex justify-between">
            <span>{item.name} x{item.qty}</span>
            <span>Rp {(item.price * item.qty).toLocaleString()}</span>
          </div>
        ))}
      </motion.div>

      {/* Total */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="mt-5 bg-white p-4 shadow-lg rounded-xl flex justify-between text-xl font-semibold">
        <span>Total</span>
        <span>Rp {total.toLocaleString()}</span>
      </motion.div>
    </div>
  );
}
