// frontend/src/app/admin/qr-tables/page.tsx
"use client";

import { motion } from "framer-motion";
import { QrCode } from "lucide-react";

export default function AdminQRTablesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Kelola QR Meja
      </h1>
      <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center space-y-4">
        <QrCode size={48} className="text-blue-500" />
        <p className="text-gray-600 text-center">
          Halaman ini akan memungkinkan Anda membuat, melihat, dan mencetak QR code untuk setiap meja. (Placeholder)
        </p>
      </div>
    </motion.div>
  );
}