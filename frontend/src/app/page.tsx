"use client";

import Link from "next/link";
import { motion } from "framer-motion";



export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-100 to-indigo-200 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-2xl bg-white/40 border border-white/30 shadow-2xl p-10 rounded-3xl max-w-xl w-full text-center"
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-800 drop-shadow-sm"
        >
          🍽️ Selamat Datang!
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-700 mt-4 leading-relaxed md:text-lg"
        >
          Sistem pemesanan makanan modern & cepat.  
          Pesan langsung dari meja Anda tanpa perlu antre!
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45 }}
          className="mt-10"
        >
          <Link
            href="/customer/menu"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 inline-block text-lg"
          >
            🚀 Mulai Pesan Sekarang
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

