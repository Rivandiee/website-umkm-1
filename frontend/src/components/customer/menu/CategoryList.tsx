// frontend/src/components/customer/menu/CategoryList.tsx
"use client";

import { motion } from "framer-motion";
import { Utensils, Coffee, IceCream, Pizza } from "lucide-react";

interface CategoryListProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export default function CategoryList({
  selectedCategory,
  setSelectedCategory,
}: CategoryListProps) {
  const categories = [
    { id: "All", name: "Semua", icon: Utensils },
    { id: "Makanan", name: "Makanan", icon: Pizza },
    { id: "Minuman", name: "Minuman", icon: Coffee },
    { id: "Dessert", name: "Dessert", icon: IceCream },
  ];

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
      {categories.map((category, index) => {
        const Icon = category.icon;
        const isActive = selectedCategory === category.id;

        return (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
              isActive
                ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Icon size={18} />
            {category.name}
          </motion.button>
        );
      })}
    </div>
  );
}
