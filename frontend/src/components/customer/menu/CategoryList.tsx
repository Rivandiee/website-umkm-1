"use client";

import { motion } from "framer-motion";

interface Category {
  id: string;
  name: string;
}

interface CategoryListProps {
  categories: Category[];        // ← terima dari parent/API
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  isLoading?: boolean;
}

export default function CategoryList({
  categories,
  selectedCategory,
  setSelectedCategory,
  isLoading = false,
}: CategoryListProps) {
  // Tambahkan "Semua" secara otomatis di awal
  const allCategories = [{ id: "All", name: "semua" }, ...categories];

  if (isLoading) {
    return (
      <div className="flex gap-3 overflow-x-auto pb-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-10 w-24 rounded-xl bg-gray-200 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
      {allCategories.map((category, index) => {
        const isActive = 
        category.id === "All" 
          ? selectedCategory === "All" 
          : selectedCategory === category.name;
        return (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedCategory(category.id === "All" ? "All" : category.name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
              isActive
                ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {category.name}
          </motion.button>
        );
      })}
    </div>
  );
}