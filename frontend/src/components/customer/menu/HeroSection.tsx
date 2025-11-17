// frontend/src/components/customer/menu/HeroSection.tsx
"use client";

import { motion } from "framer-motion";
import { Sparkles, Star } from "lucide-react";

export default function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative bg-gradient-to-r from-orange-500 to-pink-500 px-4 py-8 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full blur-xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white rounded-full blur-xl" />
      </div>

      <div className="relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 mb-3"
        >
          <Sparkles size={20} className="text-yellow-300" />
          <span className="text-white text-sm font-semibold">
            Promo Spesial Hari Ini
          </span>
        </motion.div>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-white mb-2"
        >
          Diskon 20% untuk Menu Pilihan!
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-white/90 mb-4"
        >
          Nikmati hidangan lezat dengan harga spesial
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-2"
        >
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="text-yellow-300 fill-yellow-300" />
            ))}
          </div>
          <span className="text-white text-sm font-medium">4.8 (1.2k reviews)</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
