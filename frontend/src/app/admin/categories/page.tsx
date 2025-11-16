// frontend/src/app/admin/categories/page.tsx
"use client";

import { motion } from "framer-motion";

export default function AdminCategoriesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Kelola Kategori Menu
      </h1>
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <p className="text-gray-600">
          Halaman ini akan menampilkan daftar kategori dan fungsionalitas untuk menambah, mengedit, atau menghapus kategori. (Placeholder)
        </p>
      </div>
    </motion.div>
  );
}