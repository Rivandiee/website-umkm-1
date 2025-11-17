// frontend/src/components/customer/menu/Footer.tsx
"use client";

import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">UMKM Rumah Makan</h3>
            <p className="text-gray-400 text-sm">
              Menyajikan hidangan lezat dengan cita rasa autentik sejak 2020
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Kontak</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <Phone size={16} />
                <span>+62 812-3456-7890</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Mail size={16} />
                <span>info@rumahmakan.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin size={16} />
                <span>Jl. Contoh No. 123, Jakarta</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>© 2025 UMKM Rumah Makan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
