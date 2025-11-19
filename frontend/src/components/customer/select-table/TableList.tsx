// components/customer/select-table/TableList.tsx
"use client";

import { motion } from "framer-motion";
import { Users, ChevronRight } from "lucide-react";


interface Table {
  number: number;
  capacity: number;
  status: "available" | "occupied";
}

interface TableListProps {
  tables: Table[];
  selectedTable: number | null;
  onTableSelect: (tableNum: number) => void;
}

export default function TableList({
  tables,
  selectedTable,
  onTableSelect,
}: TableListProps) {
  if (tables.length === 0) {
    return (
      <div className="w-full p-6 rounded-xl flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-200 bg-white/50">
        <Users size={32} className="text-gray-400 mb-2" />
        <div className="font-semibold text-lg">Tidak ada meja</div>
        <div className="text-sm text-gray-500">Belum ada meja yang tersedia saat ini.</div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    return status === "available"
      ? "bg-green-100 text-green-700 border-green-300"
      : "bg-red-100 text-red-700 border-red-300";
  };

  const getStatusLabel = (status: string) => {
    return status === "available" ? "Tersedia" : "Terisi";
  };

  return (
    <div className="space-y-3">
      {tables.map((table, index) => (
        <motion.button
          key={table.number}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.02 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() =>
            table.status === "available" && onTableSelect(table.number)
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
                  selectedTable === table.number ? "text-white" : "text-gray-400"
                }
              />
            )}
          </div>
        </motion.button>
      ))}
    </div>
  );
}
