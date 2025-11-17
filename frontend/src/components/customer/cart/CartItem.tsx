// src/components/customer/cart/CartItem.tsx
"use client";

import { motion } from "framer-motion";
import { Minus, Plus, Trash2, MessageSquare } from "lucide-react";

import { CartItemType } from "./CartItemsList";

interface CartItemProps {
  item: CartItemType;
  index: number;
  showNote: boolean;
  onIncreaseQty: (id: number) => void;
  onDecreaseQty: (id: number) => void;
  onRemoveItem: (id: number) => void;
  onToggleNoteInput: (id: number) => void;
  onUpdateNote: (id: number, note: string) => void;
}

export default function CartItem({
  item,
  index,
  showNote,
  onIncreaseQty,
  onDecreaseQty,
  onRemoveItem,
  onToggleNoteInput,
  onUpdateNote,
}: CartItemProps) {
  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-gray-50 rounded-xl p-3 sm:p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex gap-3 sm:gap-4">
        {/* Image */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex-shrink-0 flex items-center justify-center">
          <span className="text-gray-400 text-xs">IMG</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 text-sm sm:text-base truncate">
                {item.name}
              </h3>
              <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full inline-block mt-1">
                {item.category}
              </span>
            </div>
            <button
              onClick={() => onRemoveItem(item.id)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-2 flex-shrink-0"
            >
              <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>
          </div>

          <div className="text-base sm:text-lg font-bold text-orange-600 mb-3">
            Rp {(item.price * item.qty).toLocaleString("id-ID")}
            <span className="text-xs sm:text-sm text-gray-500 font-normal ml-2">
              (Rp {item.price.toLocaleString("id-ID")} x {item.qty})
            </span>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3 bg-white rounded-lg p-1">
              <button
                onClick={() => onDecreaseQty(item.id)}
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Minus size={14} className="sm:w-4 sm:h-4" />
              </button>
              <span className="font-bold text-gray-900 w-6 sm:w-8 text-center text-sm sm:text-base">
                {item.qty}
              </span>
              <button
                onClick={() => onIncreaseQty(item.id)}
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Plus size={14} className="sm:w-4 sm:h-4" />
              </button>
            </div>

            <button
              onClick={() => onToggleNoteInput(item.id)}
              className={`flex items-center gap-1 text-xs sm:text-sm font-medium px-2 sm:px-3 py-2 rounded-lg transition-colors ${
                item.note || showNote
                  ? "bg-orange-100 text-orange-600"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              <MessageSquare size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Catatan</span>
            </button>
          </div>

          {/* Note Input */}
          {showNote && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-3"
            >
              <textarea
                value={item.note}
                onChange={(e) => onUpdateNote(item.id, e.target.value)}
                placeholder="Tambahkan catatan untuk item ini..."
                className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                rows={2}
              />
            </motion.div>
          )}

          {item.note && !showNote && (
            <div className="mt-2 text-xs text-gray-600 italic bg-yellow-50 px-3 py-2 rounded-lg">
              📝 {item.note}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
