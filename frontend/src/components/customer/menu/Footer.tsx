"use client";

import { Phone, MapPin, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-8 pb-6">
      <div className="px-5 pt-6">

        {/* Brand */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">R</span>
          </div>
          <span className="font-semibold text-gray-900 text-sm">UMKM Rumah Makan</span>
        </div>

        <p className="text-xs text-gray-400 mb-4 leading-relaxed">
          Menyajikan hidangan lezat dengan cita rasa autentik sejak 2020.
        </p>

        {/* Info row */}
        <div className="flex flex-col gap-1.5 mb-4">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Phone size={12} className="text-orange-400" />
            <span>+62 812-3456-7890</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <MapPin size={12} className="text-orange-400" />
            <span>Jl. Contoh No. 123, Jakarta</span>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-300">© 2025 UMKM Rumah Makan</p>
          {/* <div className="flex gap-2">
            
              href="#"
              className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-full hover:bg-orange-100 transition-colors"
            >
              <Instagram size={13} className="text-gray-500 hover:text-orange-500" />
            </a>
            
              href="#"
              className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-full hover:bg-orange-100 transition-colors"
            >
              <Facebook size={13} className="text-gray-500 hover:text-orange-500" />
            </a>
          </div> */}
        </div>

      </div>
    </footer>
  );
}