"use client";
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Cari menu favorit..."
        className="w-full py-2.5 pl-10 pr-4 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-orange-500"
      />
      <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
    </div>
  );
}
