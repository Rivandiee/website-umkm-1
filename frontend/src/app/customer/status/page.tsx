// app/customer/status/page.tsx
"use client";

import { useEffect, useState } from "react";

import StatusHeader from "../../../components/customer/status/StatusHeader";
import StatusProgressCard from "../../../components/customer/status/StatusProgressCard";
import TimeAndEstimate from "../../../components/customer/status/TimeAndEstimate";
import CustomerInfoCard from "../../../components/customer/status/CustomerInfoCard";
import OrderItemsCard from "../../../components/customer/status/OrderItemsCard";
import OrderCompletionBanner from "../../../components/customer/status/OrderCompletionBanner";

import { CheckCircle, Clock, UtensilsCrossed, User, MapPin, Bell, Package, Sparkles } from "lucide-react";

type OrderStatus = "PENDING" | "PREPARING" | "READY" | "DONE";

interface StatusConfigItem {
  label: string;
  description: string;
  color: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  icon: React.ComponentType<any>;
  progress: number;
}

interface OrderItem {
  id: string;
  name: string;
  qty: number;
  price: number;
}

const statusConfig: Record<OrderStatus, StatusConfigItem> = {
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

export default function StatusPage() {
  const [orderStatus, setOrderStatus] = useState<OrderStatus>("PENDING");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    { id: "1", name: "Ayam Geprek", qty: 1, price: 20000 },
    { id: "2", name: "Es Teh Manis", qty: 2, price: 5000 },
    { id: "3", name: "Nasi Goreng", qty: 1, price: 25000 },
  ]);

  const [customerName] = useState("Budi Santoso");
  const [tableNumber] = useState("12");
  const [orderId] = useState("ORD-12345");
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const total = orderItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const currentStatus = statusConfig[orderStatus];

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulasi perubahan status
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
      <StatusHeader
        orderId={orderId}
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
      />

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <StatusProgressCard currentStatus={currentStatus} />

        <TimeAndEstimate
          timeElapsed={timeElapsed}
          formatTime={formatTime}
        />

        <CustomerInfoCard
          customerName={customerName}
          tableNumber={tableNumber}
        />

        <OrderItemsCard
          orderItems={orderItems}
          total={total}
        />

        {/* Tombol aksi (di desain kamu cuma ada “Kembali ke Menu”) */}
        {/* Bisa di-extract jadi komponen kalau mau, tapi di sini simple saja */}
        {/* Action Buttons */}
        {/* Kalau mau jadi komponen: StatusActions.tsx */}
        {/* Dibiarkan inline dulu, sesuai kebutuhan */}
        {/* Action Buttons */}
        {/* Bisa extract, tapi ini single link jadi tidak wajib */}
        {/* --- */}
        {/* Action Buttons */}
        {/* --- */}
        {/* Inline: */}
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <div>
          <a
            href="/customer/menu"
            className="block w-full py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-orange-500 hover:text-orange-600 transition-all text-center"
          >
            Kembali ke Menu
          </a>
        </div>

        <OrderCompletionBanner
          orderStatus={
            orderStatus === "PENDING" ? "PENDING" : orderStatus === "DONE" ? "DONE" : "IN_PROGRESS"
          }
        />
      </div>
    </div>
  );
}
