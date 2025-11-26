"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Star } from "lucide-react";
import { useState, useEffect } from "react";
import api from "../../../lib/axios"; // Import axios yang sudah kita buat

interface Menu {
  id: number;
  name: string;
  price: number;
  image: string | null;
  description: string;
  category: {
    name: string;
  };
  rating?: number; // Backend belum ada rating, bisa di default
}

interface MenuListProps {
  searchQuery: string;
  selectedCategory: string;
  onAddToCart: (item: any) => void;
}

export default function MenuList({
  searchQuery,
  selectedCategory,
  onAddToCart,
}: MenuListProps) {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data dari API saat komponen dimuat
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        // Panggil endpoint: /customer/menus
        const response = await api.get("/customer/menus");
        setMenus(response.data);
      } catch (error) {
        console.error("Gagal mengambil menu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  // Helper untuk URL Gambar
  const getImageUrl = (path: string | null) => {
    if (!path) return "/placeholder-food.jpg"; // Gambar default jika kosong
    if (path.startsWith("http")) return path;
    return `${process.env.NEXT_PUBLIC_IMAGE_URL}/${path.split('/').pop()}`;
  };

  const filteredMenu = menus.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    
    // Sesuaikan logika kategori dengan response backend
    const matchesCategory =
      selectedCategory === "All" || item.category.name === selectedCategory;
      
    return matchesSearch && matchesCategory;
  });

  if (loading) return <div className="text-center py-10">Memuat menu...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">Menu Pilihan</h2>
        <span className="text-sm text-gray-500">{filteredMenu.length} menu</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        <AnimatePresence>
          {filteredMenu.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
            >
              <div className="relative h-32 sm:h-40 bg-gray-200">
                {/* Ganti div dengan img tag yang mengarah ke URL backend */}
                <img 
                  src={getImageUrl(item.image)} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-3 sm:p-4">
                <div className="mb-2">
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {item.description || "Tidak ada deskripsi"}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm sm:text-base font-bold text-gray-900">
                    Rp {item.price.toLocaleString("id-ID")}
                  </div>

                  <button
                    onClick={() => onAddToCart(item)}
                    className="p-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg sm:rounded-xl hover:shadow-lg transition-all flex-shrink-0"
                  >
                    <Plus size={16} className="sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}