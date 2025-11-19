// components/customer/select-table/SelectTableHeader.tsx
"use client";

import { Users, Grid3x3, List, Search, X } from "lucide-react";

type ViewMode = "grid" | "list";

type Table = {
  id: string | number;
  number: string | number;
  status: "available" | "occupied" | string;
  seats?: number;
};

interface SelectTableHeaderProps {
  filteredTables: Table[];
  viewMode: ViewMode;
  searchQuery: string;
  onViewModeChange: (mode: ViewMode) => void;
  onSearchChange: (query: string) => void;
}

export default function SelectTableHeader({
  filteredTables,
  viewMode,
  searchQuery,
  onViewModeChange,
  onSearchChange,
}: SelectTableHeaderProps) {
  const availableCount = filteredTables.filter(
    (t) => t.status === "available"
  ).length;

  return (
    <div className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <Users size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                Pilih Nomor Meja
              </h1>
              <p className="text-sm text-gray-600">
                {availableCount} meja tersedia
              </p>
            </div>
          </div>

          {/* View Toggle */}
          <div className="hidden sm:flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => onViewModeChange("grid")}
              className={`p-2 rounded-md transition-all ${
                viewMode === "grid"
                  ? "bg-white shadow-sm text-orange-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              aria-label="Grid view"
            >
              <Grid3x3 size={20} />
            </button>
            <button
              onClick={() => onViewModeChange("list")}
              className={`p-2 rounded-md transition-all ${
                viewMode === "list"
                  ? "bg-white shadow-sm text-orange-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              aria-label="List view"
            >
              <List size={20} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-4 relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari nomor meja..."
            className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-full"
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
