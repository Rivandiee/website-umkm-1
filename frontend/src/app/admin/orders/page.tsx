// frontend/src/app/admin/orders/page.tsx

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, UtensilsCrossed, Eye, ClipboardList } from "lucide-react";

type OrderStatus = "PENDING" | "PREPARING" | "DONE";

interface Order {
  id: number;
  customerName: string;
  tableNumber: number;
  totalPrice: number;
  status: OrderStatus;
  items: { name: string; qty: number; note?: string }[];
}

export default function AdminOrdersPage() {
  // Dummy data pesanan
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 101,
      customerName: "Budi",
      tableNumber: 5,
      totalPrice: 45000,
      status: "PENDING",
      items: [
        { name: "Nasi Goreng Spesial", qty: 1 },
        { name: "Es Teh Manis", qty: 2 },
      ],
    },
    {
      id: 102,
      customerName: "Ayu",
      tableNumber: 12,
      totalPrice: 20000,
      status: "PREPARING",
      items: [{ name: "Ayam Geprek Sambal", qty: 1 }],
    },
    {
      id: 103,
      customerName: "Kasir",
      tableNumber: 1,
      totalPrice: 75000,
      status: "DONE",
      items: [
        { name: "Sate Ayam", qty: 2 },
        { name: "Air Mineral", qty: 3 },
      ],
    },
  ]);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "PREPARING":
        return "bg-blue-100 text-blue-700";
      case "DONE":
        return "bg-green-100 text-green-700";
    }
  };

  const updateOrderStatus = (id: number, newStatus: OrderStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
    alert(`Pesanan ${id} diperbarui menjadi ${newStatus}.`);
    // TODO: Implement API call here
  };
  
  // Fungsi untuk menampilkan detail pesanan (modal/log)
  const viewDetails = (order: Order) => {
      console.log("Order Details:", order);
      alert(`Detail Pesanan ${order.id}:\n\n- Nama: ${order.customerName}\n- Meja: ${order.tableNumber}\n- Total: Rp ${order.totalPrice.toLocaleString()}\n- Status: ${order.status}\n- Item: ${order.items.map(i => `${i.name} x${i.qty}`).join(', ')}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Daftar Pesanan ({orders.length})
      </h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <motion.div
            key={order.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-5 rounded-2xl shadow-lg border-l-4 border-blue-500 flex flex-col md:flex-row justify-between"
          >
            <div className="flex-1 space-y-2 mb-4 md:mb-0">
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
                <span className="text-sm font-medium text-gray-500">Order #{order.id}</span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800">{order.customerName} - Meja {order.tableNumber}</h3>
              
              <p className="text-2xl font-extrabold text-blue-600">
                Rp {order.totalPrice.toLocaleString()}
              </p>
              
              <button onClick={() => viewDetails(order)} className="text-sm text-gray-500 underline flex items-center gap-1 hover:text-blue-500 transition">
                  <Eye size={16} /> Lihat Detail
              </button>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 w-full md:w-auto">
              {order.status === "PENDING" && (
                <button
                  onClick={() => updateOrderStatus(order.id, "PREPARING")}
                  className="w-full md:w-40 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl font-semibold transition"
                >
                  <UtensilsCrossed size={18} /> Proses Dapur
                </button>
              )}
              
              {order.status === "PREPARING" && (
                <button
                  onClick={() => updateOrderStatus(order.id, "DONE")}
                  className="w-full md:w-40 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl font-semibold transition"
                >
                  <CheckCircle size={18} /> Selesai
                </button>
              )}
              
              {order.status === "DONE" && (
                <button
                  disabled
                  className="w-full md:w-40 flex items-center justify-center gap-2 bg-gray-300 text-gray-700 py-2 rounded-xl font-semibold cursor-not-allowed"
                >
                  <CheckCircle size={18} /> Selesai
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      {orders.length === 0 && (
          <div className="text-center py-10 bg-white rounded-xl shadow-lg">
              <ClipboardList size={40} className="text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">Belum ada pesanan baru hari ini.</p>
          </div>
      )}
    </motion.div>
  );
}