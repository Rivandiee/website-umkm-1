// src/components/customer/cart/CartItemsList.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import CartItem from "./CartItem";

export type CartItemType = {
  id: number;
  name: string;
  price: number;
  qty: number;
  image: string;
  note: string;
  category: string;
};

interface CartItemsListProps {
  cart: CartItemType[];
  showNoteInputs: { [key: number]: boolean };
  onIncreaseQty: (id: number) => void;
  onDecreaseQty: (id: number) => void;
  onRemoveItem: (id: number) => void;
  onToggleNoteInput: (id: number) => void;
  onUpdateNote: (id: number, note: string) => void;
}

export default function CartItemsList({
  cart,
  showNoteInputs,
  onIncreaseQty,
  onDecreaseQty,
  onRemoveItem,
  onToggleNoteInput,
  onUpdateNote,
}: CartItemsListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-2xl shadow-md p-4 sm:p-6"
    >
      <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
        Item Pesanan ({cart.length})
      </h2>
      <div className="space-y-4">
        <AnimatePresence>
          {cart.map((item, index) => (
            <CartItem
              key={item.id}
              item={item}
              index={index}
              showNote={!!showNoteInputs[item.id]}
              onIncreaseQty={onIncreaseQty}
              onDecreaseQty={onDecreaseQty}
              onRemoveItem={onRemoveItem}
              onToggleNoteInput={onToggleNoteInput}
              onUpdateNote={onUpdateNote}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
