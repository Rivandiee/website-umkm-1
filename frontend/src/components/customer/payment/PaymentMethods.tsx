// src/components/customer/payment/PaymentMethods.tsx
"use client";

import { motion } from "framer-motion";
import { Wallet, Smartphone, CheckCircle } from "lucide-react";

interface PaymentMethodsProps {
  selectedMethod: string | null;
  onSelectMethod: (id: string) => void;
}

const paymentMethods = [
  {
    id: "cash",
    name: "Tunai",
    description: "Bayar langsung di kasir setelah makan",
    icon: Wallet,
    color: "from-green-500 to-emerald-600",
    badge: "Populer",
  },
  {
    id: "qris",
    name: "QRIS",
    description: "Scan QR code untuk bayar digital",
    icon: Smartphone,
    color: "from-blue-500 to-cyan-600",
    badge: "Cepat",
  },
];

export default function PaymentMethods({
  selectedMethod,
  onSelectMethod,
}: PaymentMethodsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-2xl shadow-md p-4 sm:p-6"
    >
      <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
        Pilih Metode Pembayaran
      </h2>
      <div className="space-y-4">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;

          return (
            <motion.button
              key={method.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onSelectMethod(method.id)}
              className={`relative w-full p-4 sm:p-5 rounded-xl border-2 transition-all text-left ${
                isSelected
                  ? "border-orange-500 bg-orange-50 shadow-lg"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-md"
              }`}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center flex-shrink-0`}
                >
                  <Icon size={24} className="text-white sm:w-7 sm:h-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 text-base sm:text-lg truncate">
                      {method.name}
                    </h3>
                    <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded-full flex-shrink-0">
                      {method.badge}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {method.description}
                  </p>
                </div>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                    className="flex-shrink-0"
                  >
                    <CheckCircle size={24} className="text-orange-500" />
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
