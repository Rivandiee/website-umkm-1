"use client";
import { ShoppingCart } from "lucide-react";

export default function TopBar() {
  return (
    <header className="w-full bg-white shadow-sm py-3 px-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Menu</h1>

      <button className="relative">
        <ShoppingCart size={26} className="text-gray-700" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
          0
        </span>
      </button>
    </header>
  );
}
