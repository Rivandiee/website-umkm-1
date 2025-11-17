// frontend/src/app/customer/status/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  CheckCircle,
  Clock,
  UtensilsCrossed,
  User,
  MapPin,
  ArrowRight,
  Bell,
  RefreshCw,
  Package,
  Sparkles,
} from "lucide-react";

interface OrderItem {
  id: number;
  name: string;
  qty: number;
  price: number;
}

type OrderStatus = "PENDING" | "PREPARING" | "READY" | "DONE";

export default function StatusPage() {
  const [orderStatus, setOrderStatus] = useState<OrderStatus>("PENDING");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    { id: 1, name: "Ayam Geprek", qty: 1, price: 20000 },
    { id: 2, name: "Es Teh Manis", qty: 2, price: 5000 },
    { id: 3, name: "Nasi Goreng", qty: 1, price: 25000 },
  ]);
  const [customerName] = useState("Budi Santoso");
  const [tableNumber] = useState("12");
  const [orderId] = useState("ORD-12345");
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const total = orderItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Timer for elapsed time
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate status progression
  useEffect(() => {
    const timer1 = setTimeout(() => setOrderStatus("PREPARING"), 3000);
    const timer2 = setTimeout(() => setOrderStatus("READY"), 6000);
    const timer3 = setTimeout(() => setOrderStatus("DONE"), 9000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const statusConfig = {
    PENDING: {
      label: "Pesanan Diterima",
      description: "Menunggu konfirmasi dari dapur",
      color: "from-yellow-400 to-orange-500",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-700",
      borderColor: "border-yellow-300",
      icon: Clock,
      progress: 25,
    },
    PREPARING: {
      label: "Sedang Diproses",
      description: "Chef sedang menyiapkan pesanan Anda",
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      borderColor: "border-blue-300",
      icon: UtensilsCrossed,
      progress: 50,
    },
    READY: {
      label: "Siap Diantar",
      description: "Pesanan siap untuk diantar ke meja",
      color: "from-orange-400 to-pink-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
      borderColor: "border-orange-300",
      icon: Package,
      progress: 75,
    },
    DONE: {
      label: "Selesai",
      description: "Pesanan telah sampai, selamat menikmati!",
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      borderColor: "border-green-300",
      icon: CheckCircle,
      progress: 100,
    },
  };

  const currentStatus = statusConfig[orderStatus];
  const StatusIcon = currentStatus.icon;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center"
              >
                <Sparkles size={20} className="text-white" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Status Pesanan
                </h1>
                <p className="text-xs text-gray-500">{orderId}</p>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <RefreshCw
                size={20}
                className={`text-gray-600 ${isRefreshing ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden"
        >
          <div className={`bg-gradient-to-r ${currentStatus.color} rounded-2xl p-6 text-white shadow-xl`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4"
                  >
                    <StatusIcon size={32} className="text-white" />
                  </motion.div>
                  <h2 className="text-2xl font-bold mb-2">
                    {currentStatus.label}
                  </h2>
                  <p className="text-white/90">{currentStatus.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{currentStatus.progress}%</div>
                  <div className="text-sm text-white/80">Progress</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${currentStatus.progress}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-white rounded-full"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Time & Customer Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="bg-white rounded-2xl shadow-md p-5">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="text-blue-600" size={24} />
              <span className="text-sm text-gray-600">Waktu Berlalu</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {formatTime(timeElapsed)}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <div className="flex items-center gap-3 mb-2">
              <Bell className="text-orange-600" size={24} />
              <span className="text-sm text-gray-600">Estimasi</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">15-20 min</p>
          </div>
        </motion.div>

        {/* Customer Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Informasi Pemesan
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <User className="text-gray-400" size={20} />
              <div>
                <p className="text-xs text-gray-500">Nama</p>
                <p className="font-semibold text-gray-900">{customerName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <MapPin className="text-gray-400" size={20} />
              <div>
                <p className="text-xs text-gray-500">Nomor Meja</p>
                <p className="font-semibold text-gray-900">Meja {tableNumber}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Order Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Detail Pesanan
          </h3>
          <div className="space-y-3">
            {orderItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.qty}</p>
                </div>
                <p className="font-bold text-gray-900">
                  Rp {(item.price * item.qty).toLocaleString("id-ID")}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">Total Bayar</span>
            <span className="text-2xl font-bold text-orange-600">
              Rp {total.toLocaleString("id-ID")}
            </span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >

          <Link
            href="/customer/menu"
            className="block w-full py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-orange-500 hover:text-orange-600 transition-all text-center"
          >
            Kembali ke Menu
          </Link>
        </motion.div>

        {/* Order Completion */}
        <AnimatePresence>
          {orderStatus === "DONE" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-6 text-white text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle size={64} className="mx-auto mb-4" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-2">Selamat Menikmati!</h3>
              <p className="text-white/90 mb-4">
                Pesanan Anda telah sampai. Terima kasih telah memesan!
              </p>
              <Link
                href="/customer/rating"
                className="inline-block px-6 py-3 bg-white text-green-600 font-bold rounded-xl hover:shadow-lg transition-all"
              >
                Beri Rating
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
