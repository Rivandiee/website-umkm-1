// frontend/src/components/customer/menu/MenuList.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Star } from "lucide-react";
import { useState } from "react";

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
  const menuItems = [
    {
      id: 1,
      name: "Nasi Goreng Spesial",
      category: "Makanan",
      price: 25000,
      image: "/menu/nasi-goreng.jpg",
      rating: 4.8,
      description: "Nasi goreng dengan telur, ayam, dan sayuran segar",
      discount: 20,
    },
    {
      id: 2,
      name: "Mie Goreng",
      category: "Makanan",
      price: 20000,
      image: "/menu/mie-goreng.jpg",
      rating: 4.5,
      description: "Mie goreng dengan topping ayam dan sayuran",
    },
    {
      id: 3,
      name: "Es Teh Manis",
      category: "Minuman",
      price: 5000,
      image: "/menu/es-teh.jpg",
      rating: 4.9,
      description: "Es teh manis segar",
    },
    {
      id: 4,
      name: "Ayam Bakar",
      category: "Makanan",
      price: 30000,
      image: "/menu/ayam-bakar.jpg",
      rating: 4.7,
      description: "Ayam bakar bumbu kecap dengan lalapan",
      discount: 20,
    },
    {
      id: 5,
      name: "Jus Jeruk",
      category: "Minuman",
      price: 12000,
      image: "/menu/jus-jeruk.jpg",
      rating: 4.6,
      description: "Jus jeruk segar tanpa gula tambahan",
    },
    {
      id: 6,
      name: "Es Krim Coklat",
      category: "Dessert",
      price: 15000,
      image: "/menu/es-krim.jpg",
      rating: 4.8,
      description: "Es krim coklat dengan topping kacang",
    },
    {
      id: 7,
      name: "Sate Ayam",
      category: "Makanan",
      price: 35000,
      image: "/menu/sate-ayam.jpg",
      rating: 4.9,
      description: "Sate ayam dengan bumbu kacang spesial",
    },
    {
      id: 8,
      name: "Cappuccino",
      category: "Minuman",
      price: 18000,
      image: "/menu/cappuccino.jpg",
      rating: 4.7,
      description: "Cappuccino dengan foam lembut",
    },
  ];

  const filteredMenu = menuItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">Menu Pilihan</h2>
        <span className="text-sm text-gray-500">{filteredMenu.length} menu</span>
      </div>

      {/* Grid 4 Columns */}
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
              {/* Image */}
              <div className="relative h-32 sm:h-40 bg-gradient-to-br from-gray-200 to-gray-300">
                {item.discount && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{item.discount}%
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs sm:text-sm">
                  Menu Image
                </div>
              </div>

              {/* Content */}
              <div className="p-3 sm:p-4">
                <div className="mb-2">
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-1 mb-2 sm:mb-3">
                  <Star size={12} className="text-yellow-400 fill-yellow-400 sm:w-3.5 sm:h-3.5" />
                  <span className="text-xs sm:text-sm font-medium text-gray-700">
                    {item.rating}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    {item.discount ? (
                      <div>
                        <div className="text-xs text-gray-400 line-through">
                          Rp {item.price.toLocaleString("id-ID")}
                        </div>
                        <div className="text-sm sm:text-base font-bold text-orange-600">
                          Rp{" "}
                          {(
                            item.price -
                            (item.price * item.discount) / 100
                          ).toLocaleString("id-ID")}
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm sm:text-base font-bold text-gray-900">
                        Rp {item.price.toLocaleString("id-ID")}
                      </div>
                    )}
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

      {filteredMenu.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>Tidak ada menu yang ditemukan</p>
        </div>
      )}
    </div>
  );
}
