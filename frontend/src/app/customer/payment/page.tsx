// app/customer/payment/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    name: string;
    qty: number;
    price: number;
  }[];
  note?: string;
}

export default function PaymentPage() {
  // Mock data - nanti bisa diganti dari context/store
  const orderData: OrderData = {
    customerName: "John Doe",
    tableNumber: 5,
    items: [
      { name: "Ayam Geprek", qty: 1, price: 20000 },
      { name: "Es Teh Manis", qty: 2, price: 5000 },
      { name: "Nasi Goreng", qty: 1, price: 25000 },
    ],
    note: "Tidak pakai cabai",
  };

  const subtotal = orderData.items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const tax = Math.round(subtotal * 0.1);
  const serviceFee = 2000;
  const total = subtotal + tax + serviceFee;

  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showQRISModal, setShowQRISModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleConfirmOrder = () => {
    if (!selectedMethod) return;

    if (selectedMethod === "qris") {
      setShowQRISModal(true);
    } else {
      setShowConfirmModal(true);
    }
  };

  const handleProcessPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowConfirmModal(false);
      setShowQRISModal(false);
      setOrderSuccess(true);
    }, 2000);
  };

  if (orderSuccess) {
    return (
      <OrderSuccessView selectedMethod={selectedMethod} />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PaymentHeader />

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <OrderCustomerInfo orderData={orderData} />

            <PaymentMethods
              selectedMethod={selectedMethod}
              onSelectMethod={setSelectedMethod}
            />

            <OrderItems orderData={orderData} />
          </div>

          {/* Right Column */}
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

      {/* Cash Confirmation Modal */}
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

      {/* QRIS Payment Modal */}
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
