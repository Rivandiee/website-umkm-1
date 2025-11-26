// app/customer/select-table/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SelectTableHeader from "../../../components/customer/select-table/SelectTableHeader";
import TableGrid from "../../../components/customer/select-table/TableGrid";
import TableList from "../../../components/customer/select-table/TableList";
import TableLegend from "../../../components/customer/select-table/TableLegend";
import ConfirmationModal from "../../../components/customer/select-table/ConfirmationModal";

interface Table {
  id: string | number;
  number: number;
  status: "available" | "occupied";
  capacity: number;
}

export default function SelectTablePage() {
  const router = useRouter();
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);
  // Generate nomor meja 1-50
  const totalTables = 50;
  const [tables] = useState<Table[]>(
    Array.from({ length: totalTables }, (_, i) => ({
      id: i + 1,
      number: i + 1,
      status: Math.random() > 0.3 ? "available" : "occupied",
      capacity: [2, 4, 6, 8][Math.floor(Math.random() * 4)],
    }))
  );

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
      localStorage.setItem("tableNumber", selectedTable.toString());
      router.push(`/customer/menu?table=${selectedTable}`);
    }
  };

  const handleCancel = () => {
    setSelectedTable(null);
    setIsConfirming(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-pink-50">
      <SelectTableHeader
        filteredTables={filteredTables}
        viewMode={viewMode}
        searchQuery={searchQuery}
        onViewModeChange={setViewMode}
        onSearchChange={setSearchQuery}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-20">
        {viewMode === "grid" ? (
          <TableGrid
            tables={filteredTables}
            selectedTable={selectedTable}
            onTableSelect={handleTableSelect}
          />
        ) : (
          <TableList
            tables={filteredTables}
            selectedTable={selectedTable}
            onTableSelect={handleTableSelect}
          />
        )}
      </div>

      <TableLegend />

      <ConfirmationModal
        isOpen={isConfirming}
        selectedTable={selectedTable}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
}
