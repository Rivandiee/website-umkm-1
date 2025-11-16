// frontend/src/app/admin/menus/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

export default function AdminMenusPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Daftar Menu
        </h1>
        <Link 
          href="/admin/add-menu" 
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow transition-all"
        >
          <PlusCircle size={20} /> Tambah Menu
        </Link>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <p className="text-gray-600">
          Halaman ini akan menampilkan tabel semua menu yang terdaftar, termasuk harga, kategori, dan status ketersediaan. (Placeholder)
        </p>
      </div>
    </motion.div>
  );
}