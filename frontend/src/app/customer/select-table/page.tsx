// app/customer/select-table/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Users, ChevronRight, Grid3x3, List, Search, X } from "lucide-react";

export default function SelectTablePage() {
  const router = useRouter();
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);

  // Generate nomor meja 1-50
  const totalTables = 50;
  const tables = Array.from({ length: totalTables }, (_, i) => ({
    number: i + 1,
    status: Math.random() > 0.3 ? "available" : "occupied", // Random status untuk demo
    capacity: [2, 4, 6, 8][Math.floor(Math.random() * 4)], // Random capacity
  }));

  // Filter meja berdasarkan pencarian
  const filteredTables = tables.filter((table) =>
    table.number.toString().includes(searchQuery)
  );

  const handleTableSelect = (tableNum: number) => {
    setSelectedTable(tableNum);
    setIsConfirming(true);
  };

  const handleConfirm = () => {
    if (selectedTable) {
      // Simpan nomor meja ke localStorage
      localStorage.setItem("tableNumber", selectedTable.toString());

      // Redirect ke halaman menu dengan query parameter
      router.push(`/customer/menu?table=${selectedTable}`);
    }
  };

  const handleCancel = () => {
    setSelectedTable(null);
    setIsConfirming(false);
  };

  const getStatusColor = (status: string) => {
    return status === "available"
      ? "bg-green-100 text-green-700 border-green-300"
      : "bg-red-100 text-red-700 border-red-300";
  };

  const getStatusLabel = (status: string) => {
    return status === "available" ? "Tersedia" : "Terisi";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-pink-50">
      {/* Header */}
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
                  {filteredTables.filter((t) => t.status === "available").length}{" "}
                  meja tersedia
                </p>
              </div>
            </div>

            {/* View Toggle */}
            <div className="hidden sm:flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-all ${
                  viewMode === "grid"
                    ? "bg-white shadow-sm text-orange-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <Grid3x3 size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-all ${
                  viewMode === "list"
                    ? "bg-white shadow-sm text-orange-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
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
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nomor meja..."
              className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-full"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table Grid/List */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {filteredTables.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Meja Tidak Ditemukan
            </h3>
            <p className="text-gray-600">
              Coba cari dengan nomor meja yang berbeda
            </p>
          </motion.div>
        ) : viewMode === "grid" ? (
          // Grid View
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4">
            {filteredTables.map((table, index) => (
              <motion.button
                key={table.number}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  table.status === "available" && handleTableSelect(table.number)
                }
                disabled={table.status === "occupied"}
                className={`relative aspect-square rounded-xl p-4 flex flex-col items-center justify-center transition-all shadow-md border-2 ${
                  selectedTable === table.number
                    ? "bg-gradient-to-br from-orange-500 to-pink-500 text-white border-orange-600 shadow-xl"
                    : table.status === "available"
                    ? "bg-white hover:shadow-xl border-transparent hover:border-orange-500"
                    : "bg-gray-100 border-gray-300 cursor-not-allowed opacity-60"
                }`}
              >
                {/* Status Badge */}
                <div
                  className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
                    table.status === "available"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                />

                {/* Table Number */}
                <div
                  className={`text-3xl sm:text-4xl font-bold mb-1 ${
                    selectedTable === table.number
                      ? "text-white"
                      : "text-gray-800"
                  }`}
                >
                  {table.number}
                </div>

                {/* Capacity */}
                <div
                  className={`text-xs ${
                    selectedTable === table.number
                      ? "text-white/80"
                      : "text-gray-500"
                  }`}
                >
                  <Users size={12} className="inline mr-1" />
                  {table.capacity} orang
                </div>
              </motion.button>
            ))}
          </div>
        ) : (
          // List View
          <div className="space-y-3">
            {filteredTables.map((table, index) => (
              <motion.button
                key={table.number}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.02 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  table.status === "available" && handleTableSelect(table.number)
                }
                disabled={table.status === "occupied"}
                className={`w-full p-4 rounded-xl flex items-center justify-between transition-all shadow-md border-2 ${
                  selectedTable === table.number
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white border-orange-600 shadow-xl"
                    : table.status === "available"
                    ? "bg-white hover:shadow-xl border-transparent hover:border-orange-500"
                    : "bg-gray-100 border-gray-300 cursor-not-allowed opacity-60"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl ${
                      selectedTable === table.number
                        ? "bg-white/20 text-white"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {table.number}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg">Meja {table.number}</div>
                    <div
                      className={`text-sm flex items-center gap-2 ${
                        selectedTable === table.number
                          ? "text-white/80"
                          : "text-gray-600"
                      }`}
                    >
                      <Users size={14} />
                      Kapasitas {table.capacity} orang
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                      selectedTable === table.number
                        ? "bg-white/20 text-white border-white/30"
                        : getStatusColor(table.status)
                    }`}
                  >
                    {getStatusLabel(table.status)}
                  </span>
                  {table.status === "available" && (
                    <ChevronRight
                      size={20}
                      className={
                        selectedTable === table.number
                          ? "text-white"
                          : "text-gray-400"
                      }
                    />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">Tersedia</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-700">Terisi</span>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {isConfirming && selectedTable && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={handleCancel}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-6 text-white">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users size={32} />
                </div>
                <h2 className="text-2xl font-bold text-center">
                  Konfirmasi Nomor Meja
                </h2>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <div className="text-center mb-6">
                  <p className="text-gray-600 mb-4">
                    Anda memilih meja nomor:
                  </p>
                  <div className="inline-block px-8 py-4 bg-gradient-to-br from-orange-100 to-pink-100 rounded-xl border-2 border-orange-300">
                    <div className="text-5xl font-bold text-orange-600">
                      {selectedTable}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Nomor meja ini akan digunakan untuk pesanan Anda
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleCancel}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    Lanjutkan
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
