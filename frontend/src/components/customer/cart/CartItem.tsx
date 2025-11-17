// frontend/src/components/customer/cart/CartItem.tsx
"use client";

import { motion } from "framer-motion";
import { Plus, Minus, Trash2, MessageSquare } from "lucide-react";
import { useState } from "react";

interface CartItemProps {
  id: number;
  name: string;
  price: number;
  qty: number;
  image: string;
  note: string;
  category: string;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
  onNoteChange: (value: string) => void;
}

export default function CartItem({
  name,
  price,
  qty,
  image,
  note,
  category,
  onIncrease,
  onDecrease,
  onRemove,
  onNoteChange,
}: CartItemProps) {
  const [showNoteInput, setShowNoteInput] = useState(false);

  return (
    <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        {/* Image */}
        <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex-shrink-0 flex items-center justify-center">
          <span className="text-gray-400 text-xs">IMG</span>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-bold text-gray-900">{name}</h3>
              <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                {category}
              </span>
            </div>
            <button
              onClick={onRemove}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div className="text-lg font-bold text-orange-600 mb-3">
            Rp {(price * qty).toLocaleString("id-ID")}
            <span className="text-sm text-gray-500 font-normal ml-2">
              (Rp {price.toLocaleString("id-ID")} x {qty})
            </span>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 bg-white rounded-lg p-1">
              <button
                onClick={onDecrease}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="font-bold text-gray-900 w-8 text-center">
                {qty}
              </span>
              <button
                onClick={onIncrease}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>

            <button
              onClick={() => setShowNoteInput(!showNoteInput)}
              className={`flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
                note || showNoteInput
                  ? "bg-orange-100 text-orange-600"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              <MessageSquare size={16} />
              Catatan
            </button>
          </div>

          {/* Note Input */}
          {showNoteInput && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-3"
            >
              <textarea
                value={note}
                onChange={(e) => onNoteChange(e.target.value)}
                placeholder="Tambahkan catatan untuk item ini..."
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                rows={2}
              />
            </motion.div>
          )}

          {note && !showNoteInput && (
            <div className="mt-2 text-xs text-gray-600 italic bg-yellow-50 px-3 py-2 rounded-lg">
              📝 {note}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
