// components/customer/select-table/TableGrid.tsx
"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
// local fallback EmptyState component to avoid missing module error
function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center p-8">
      <Users size={32} className="mb-2 text-gray-400" />
      <div className="text-sm text-gray-500">Tidak ada meja tersedia</div>
    </div>
  );
}

interface TableGridProps {
  tables: {
    id: string | number;
    number: string | number;
    status: "available" | "occupied" | string;
    capacity?: number;
  }[];
  selectedTable: number | null;
  onTableSelect: (tableNum: number) => void;
}

export default function TableGrid({
  tables,
  selectedTable,
  onTableSelect,
}: TableGridProps) {
  if (tables.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4">
      {tables.map((table, index) => (
        <motion.button
          key={table.number}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.02 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            table.status === "available" && onTableSelect(Number(table.number))
          }
          disabled={table.status === "occupied"}
          className={`relative aspect-square rounded-xl p-4 flex flex-col items-center justify-center transition-all shadow-md border-2 ${
            selectedTable === Number(table.number)
              ? "bg-gradient-to-br from-orange-500 to-pink-500 text-white border-orange-600 shadow-xl"
              : table.status === "available"
              ? "bg-white hover:shadow-xl border-transparent hover:border-orange-500"
              : "bg-gray-100 border-gray-300 cursor-not-allowed opacity-60"
          }`}
        >
          {/* Status Badge */}
          <div
            className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
              table.status === "available" ? "bg-green-500" : "bg-red-500"
            }`}
          />

          {/* Table Number */}
          <div
            className={`text-3xl sm:text-4xl font-bold mb-1 ${
              selectedTable === Number(table.number) ? "text-white" : "text-gray-800"
            }`}
          >
            {table.number}
          </div>

          {/* Capacity */}
          <div
            className={`text-xs ${
              selectedTable === Number(table.number)
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
  );
}
