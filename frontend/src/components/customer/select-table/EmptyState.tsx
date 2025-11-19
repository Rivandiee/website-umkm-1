// components/customer/select-table/EmptyState.tsx
"use client";

import { motion } from "framer-motion";

export default function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        Meja Tidak Ditemukan
      </h3>
      <p className="text-gray-600">
        Coba cari dengan nomor meja yang berbeda
      </p>
    </motion.div>
  );
}
    