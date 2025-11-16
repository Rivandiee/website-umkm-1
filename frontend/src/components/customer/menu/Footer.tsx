"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full py-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 shadow-inner text-center text-gray-700 mt-10 backdrop-blur-sm border-t border-gray-200"
    >
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Brand / Copyright */}
        <p className="text-sm md:text-base font-medium">
          © 2025 UMKM Rumah Makan
        </p>

        {/* Social Media */}
        <div className="flex gap-4">
          <a href="#" className="hover:text-blue-600 transition-colors">
            <Facebook size={20} />
          </a>
          <a href="#" className="hover:text-pink-500 transition-colors">
            <Instagram size={20} />
          </a>
          <a href="#" className="hover:text-blue-400 transition-colors">
            <Twitter size={20} />
          </a>
        </div>
      </div>

      {/* Optional: small tagline */}
      <p className="text-xs text-gray-500 mt-2">
        Nikmati pengalaman memesan makanan modern & cepat
      </p>
    </motion.footer>
  );
}
