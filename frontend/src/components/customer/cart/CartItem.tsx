"use client";

import { motion } from "framer-motion";
import { Minus, Plus, Trash } from "lucide-react";

interface CartItemProps {
  id: number;
  name: string;
  price: number;
  qty: number;
  note?: string;
  image?: string;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
  onNoteChange: (value: string) => void;
}

export default function CartItem({
  name,
  price,
  qty,
  note,
  image,
  onIncrease,
  onDecrease,
  onRemove,
  onNoteChange,
}: CartItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-4 rounded-xl shadow flex gap-4"
    >
      <img
        src={image || "/placeholder.png"}
        className="w-20 h-20 object-cover rounded-xl"
      />

      <div className="flex-1">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-500 text-sm">Rp {price.toLocaleString()}</p>

        
        {/* Qty */}
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={onDecrease}
            className="p-2 bg-gray-200 rounded-full"
          >
            <Minus size={16} />
          </button>

          <span className="font-semibold">{qty}</span>

          <button
            onClick={onIncrease}
            className="p-2 bg-gray-200 rounded-full"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <button
        onClick={onRemove}
        className="p-2 bg-red-100 text-red-600 rounded-xl h-fit"
      >
        <Trash size={18} />
      </button>
    </motion.div>
  );
}
