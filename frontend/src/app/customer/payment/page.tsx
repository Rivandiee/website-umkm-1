// frontend/src/app/customer/payment/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation"; // Import useRouter
import api from "../../../lib/axios"; // Import axios helper yang sudah dibuat sebelumnya

// Import components
import PaymentHeader from "../../../components/customer/payment/PaymentHeader";
import OrderSuccessView from "../../../components/customer/payment/OrderSuccessView";
import OrderCustomerInfo from "../../../components/customer/payment/OrderCustomerInfo";
import PaymentMethods from "../../../components/customer/payment/PaymentMethods";
import OrderItems from "../../../components/customer/payment/OrderItems";
import PaymentSummary from "../../../components/customer/payment/PaymentSummary";
import CashConfirmModal from "../../../components/customer/payment/CashConfirmModal";
import QRISPaymentModal from "../../../components/customer/payment/QRISPaymentModal";

interface OrderData {
  customerName: string;
  tableNumber: number;
  items: {
    id: number; // Penting: ID Menu dari database diperlukan backend
    name: string;
    qty: number;
    price: number;
    note?: string;
  }[];
  note?: string;
}

export default function PaymentPage() {
  const router = useRouter();

  // Mock data - Dalam aplikasi nyata, data ini diambil dari Global State (Context/Redux) atau LocalStorage
  // Pastikan ID item sesuai dengan ID yang ada di database backend Anda (hasil seeding)
  const orderData: OrderData = {
    customerName: "Budi Santoso",
    tableNumber: 5,
    items: [
      { id: 1, name: "Nasi Goreng Spesial", qty: 1, price: 25000, note: "Pedas" },
      { id: 3, name: "Es Teh Manis", qty: 2, price: 5000 }, 
      // Pastikan ID 1 dan 3 ada di tabel Menu database Anda
    ],
    note: "Jangan terlalu lama ya",
  };

  // Perhitungan Total
  const subtotal = orderData.items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const tax = Math.round(subtotal * 0.1);
  const serviceFee = 2000; // Biaya layanan
  const total = subtotal + tax + serviceFee;

  // State Management
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showQRISModal, setShowQRISModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Handler Konfirmasi Awal (Membuka Modal)
  const handleConfirmOrder = () => {
    if (!selectedMethod) return;

    if (selectedMethod === "qris") {
      setShowQRISModal(true);
    } else {
      setShowConfirmModal(true);
    }
  };

  // Handler Proses Pembayaran ke Backend
  const handleProcessPayment = async () => {
    setIsProcessing(true);
    
    try {
      // Persiapkan payload sesuai spesifikasi backend (OrderService.createOrder)
      const payload = {
        customerName: orderData.customerName,
        tableNumber: orderData.tableNumber,
        items: orderData.items.map(item => ({
          id: item.id, // ID Menu
          qty: item.qty,
          price: item.price, // Backend akan memvalidasi harga ini lagi
          note: item.note
        })),
        totalPrice: total,
        paymentMethod: selectedMethod, // 'cash' atau 'qris'
        // Session ID biasanya didapat saat scan QR code (disimpan di localStorage)
        // Gunakan dummy jika testing tanpa scan QR
        sessionId: localStorage.getItem("sessionId") || "demo-session-id" 
      };

      console.log("Sending payload:", payload);

      // Request ke Backend
      const response = await api.post("/customer/orders", payload);

      if (response.status === 201) {
        const { data, snapToken } = response.data;
        
        // Khusus QRIS (Midtrans)
        if (selectedMethod === 'qris' && snapToken) {
           console.log("Snap Token diterima:", snapToken);
           // Di sini Anda bisa memanggil window.snap.pay(snapToken) jika script midtrans sudah terpasang
           // Untuk demo ini, kita anggap sukses langsung
        }

        // Simpan ID Order untuk halaman tracking status
        localStorage.setItem("lastOrderId", data.data.id);

        // Tutup modal dan tampilkan sukses
        setShowConfirmModal(false);
        setShowQRISModal(false);
        setOrderSuccess(true);
      }
    } catch (error: any) {
      console.error("Gagal membuat pesanan:", error);
      const errorMsg = error.response?.data?.error || "Terjadi kesalahan sistem";
      alert(`Gagal membuat pesanan: ${errorMsg}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Tampilan Sukses
  if (orderSuccess) {
    return (
      <OrderSuccessView selectedMethod={selectedMethod} />
    );
  }

  // Tampilan Utama Form Pembayaran
  return (
    <div className="min-h-screen bg-gray-50">
      <PaymentHeader />

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Kolom Kiri: Info Pesanan & Metode Pembayaran */}
          <div className="lg:col-span-2 space-y-6">
            <OrderCustomerInfo orderData={orderData} />

            <PaymentMethods
              selectedMethod={selectedMethod}
              onSelectMethod={setSelectedMethod}
            />

            <OrderItems orderData={orderData} />
          </div>

          {/* Kolom Kanan: Ringkasan Pembayaran */}
          <div className="lg:col-span-1">
            <PaymentSummary
              subtotal={subtotal}
              tax={tax}
              serviceFee={serviceFee}
              total={total}
              selectedMethod={selectedMethod}
              onConfirmOrder={handleConfirmOrder}
            />
          </div>
        </div>
      </div>

      {/* Modal Konfirmasi Tunai */}
      <AnimatePresence>
        {showConfirmModal && selectedMethod === "cash" && (
          <CashConfirmModal
            total={total}
            isProcessing={isProcessing}
            onClose={() => setShowConfirmModal(false)}
            onProcessPayment={handleProcessPayment}
          />
        )}
      </AnimatePresence>

      {/* Modal Pembayaran QRIS */}
      <AnimatePresence>
        {showQRISModal && selectedMethod === "qris" && (
          <QRISPaymentModal
            total={total}
            isProcessing={isProcessing}
            onClose={() => setShowQRISModal(false)}
            onProcessPayment={handleProcessPayment}
          />
        )}
      </AnimatePresence>
    </div>
  );
}