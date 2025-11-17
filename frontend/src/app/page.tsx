"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Utensils, 
  QrCode, 
  Clock, 
  ShoppingCart, 
  Star,
  ChevronRight,
  Sparkles,
  Zap,
  CheckCircle
} from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: QrCode,
      title: "Scan & Order",
      description: "Scan QR code di meja Anda dan pesan langsung"
    },
    {
      icon: Clock,
      title: "Super Cepat",
      description: "Pesanan Anda langsung masuk ke dapur"
    },
    {
      icon: ShoppingCart,
      title: "Easy Payment",
      description: "Bayar dengan berbagai metode pembayaran"
    }
  ];

  const stats = [
    { number: "1000+", label: "Pelanggan Puas" },
    { number: "50+", label: "Menu Pilihan" },
    { number: "4.8", label: "Rating Bintang" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 overflow-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-orange-200/30 to-pink-200/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full text-sm font-semibold mb-6 shadow-lg"
              >
                <Sparkles size={16} />
                <span>Sistem Pemesanan Terbaru 2025</span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6"
              >
                Pesan Makanan
                <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  {" "}Tanpa Antre
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
              >
                Nikmati pengalaman kuliner modern dengan sistem pemesanan digital. 
                Scan QR code, pilih menu favorit, dan pesanan langsung ke dapur!
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link
                  href="/customer/menu"
                  className="group relative px-8 py-4 bg-gradient-to-r from-orange-600 to-pink-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Utensils size={20} />
                    Mulai Pesan Sekarang
                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-gray-200"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Feature Cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              {/* Main Card */}
              <div className="relative backdrop-blur-2xl bg-white/80 border border-white/50 shadow-2xl rounded-3xl p-8 lg:p-10">
                {/* Floating Icon */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-orange-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl"
                >
                  <Utensils size={40} className="text-white" />
                </motion.div>

                <div className="space-y-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-100 to-pink-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <feature.icon size={24} className="text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1 text-lg">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {feature.description}
                        </p>
                      </div>
                      <CheckCircle size={20} className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Badge */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-center gap-2 text-gray-600"
                >
                  <Zap size={18} className="text-yellow-500" />
                  <span className="text-sm font-medium">
                    Proses pesanan dalam hitungan detik
                  </span>
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-200/50 to-purple-200/50 rounded-full blur-2xl"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Action Button for Mobile */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 right-8 lg:hidden z-50"
      >
        <Link
          href="/customer/menu"
          className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-600 to-pink-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
        >
          <ShoppingCart size={24} />
        </Link>
      </motion.div>
    </div>
  );
}
