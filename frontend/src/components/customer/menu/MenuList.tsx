"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search } from "lucide-react";
import { useState, useEffect } from "react";
import api from "../../../lib/axios";

interface Menu {
  id: number;
  name: string;
  price: number;
  image: string | null;
  description: string;
  category: { name: string };
}

interface MenuListProps {
  searchQuery: string;
  selectedCategory: string;
  onAddToCart: (item: any) => void;
}

// Skeleton card
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
      <div className="h-36 bg-gray-100" />
      <div className="p-3">
        <div className="h-3.5 bg-gray-100 rounded-full w-3/4 mb-2" />
        <div className="h-3 bg-gray-100 rounded-full w-full mb-1" />
        <div className="h-3 bg-gray-100 rounded-full w-2/3 mb-3" />
        <div className="flex items-center justify-between">
          <div className="h-4 bg-gray-100 rounded-full w-1/3" />
          <div className="w-8 h-8 bg-gray-100 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default function MenuList({
  searchQuery,
  selectedCategory,
  onAddToCart,
}: MenuListProps) {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState<number | null>(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
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

  const getImageUrl = (path: string | null) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return `${process.env.NEXT_PUBLIC_IMAGE_URL}/${path.split("/").pop()}`;
  };

  const handleAddToCart = (item: Menu) => {
    onAddToCart(item);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 800);
  };

  const filteredMenu = menus.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2
          className="text-lg font-bold text-gray-900"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Menu Pilihan
        </h2>
        {!loading && (
          <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
            {filteredMenu.length} menu
          </span>
        )}
      </div>

      {/* Skeleton Loading */}
      {loading && (
        <div className="grid grid-cols-2 gap-3">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredMenu.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-16 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
            <Search size={24} className="text-gray-300" />
          </div>
          <p className="text-gray-600 font-medium text-sm mb-1">
            Menu tidak ditemukan
          </p>
          <p className="text-gray-400 text-xs">
            {searchQuery
              ? `Tidak ada hasil untuk "${searchQuery}"`
              : `Belum ada menu di kategori ini`}
          </p>
        </motion.div>
      )}

      {/* Menu Grid */}
      {!loading && filteredMenu.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <AnimatePresence mode="popLayout">
            {filteredMenu.map((item, index) => {
              const imgUrl = getImageUrl(item.image);
              const isAdded = addedId === item.id;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.04, duration: 0.2 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Gambar */}
                  <div className="relative h-36 bg-gray-100">
                    {imgUrl ? (
                      <img
                        src={imgUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        🍽️
                      </div>
                    )}

                    {/* Category badge */}
                    <span className="absolute top-2 left-2 text-[10px] font-medium bg-white/90 backdrop-blur-sm text-gray-600 px-2 py-0.5 rounded-full">
                      {item.category.name}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <h3 className="font-semibold text-gray-900 text-sm mb-0.5 line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2 mb-3 leading-relaxed">
                      {item.description || "Tidak ada deskripsi"}
                    </p>

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold text-gray-900">
                        Rp {item.price.toLocaleString("id-ID")}
                      </span>

                      <motion.button
                        whileTap={{ scale: 0.88 }}
                        onClick={() => handleAddToCart(item)}
                        className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                          isAdded
                            ? "bg-green-500"
                            : "bg-orange-500 hover:bg-orange-600"
                        }`}
                      >
                        <AnimatePresence mode="wait">
                          {isAdded ? (
                            <motion.span
                              key="check"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className="text-white text-xs font-bold"
                            >
                              ✓
                            </motion.span>
                          ) : (
                            <motion.div
                              key="plus"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                            >
                              <Plus size={15} className="text-white" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}