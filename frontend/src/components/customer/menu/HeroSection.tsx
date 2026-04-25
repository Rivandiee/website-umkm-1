"use client";

import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";

export default function HeroSection() {
  const hour = new Date().getHours();
  const greeting =
    hour < 11 ? "Selamat Pagi" : hour < 15 ? "Selamat Siang" : hour < 18 ? "Selamat Sore" : "Selamat Malam";

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mx-4 mt-4 rounded-2xl bg-[#fdf8f3] border border-orange-100 px-5 py-5 overflow-hidden relative"
    >
      {/* Decorative circle */}
      <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-orange-100/60" />
      <div className="absolute -right-2 -bottom-8 w-20 h-20 rounded-full bg-pink-100/40" />

      <div className="relative z-10">
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-xs font-medium text-orange-400 uppercase tracking-widest mb-1"
        >
          {greeting} 👋
        </motion.p>

        {/* Main text */}
        <motion.h2
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-xl font-bold text-gray-900 mb-1 leading-snug"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Mau makan apa <br />
          hari ini?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-xs text-gray-400 mb-4"
        >
          Pilih menu favoritmu dan kami siapkan segera
        </motion.p>

        {/* Info chips */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="flex items-center gap-3"
        >
          <div className="flex items-center gap-1.5 bg-white border border-gray-100 rounded-full px-3 py-1.5 shadow-sm">
            <Clock size={11} className="text-orange-400" />
            <span className="text-xs text-gray-500">08.00 – 22.00</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white border border-gray-100 rounded-full px-3 py-1.5 shadow-sm">
            <MapPin size={11} className="text-orange-400" />
            <span className="text-xs text-gray-500">Jakarta</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}