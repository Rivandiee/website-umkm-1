// frontend/src/app/admin/qr-tables/page.tsx
"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  QrCode, 
  Plus, 
  Edit, 
  Trash2, 
  Download,
  Printer,
  Eye,
  X,
  Search,
  Grid3x3,
  List
} from "lucide-react";

interface Table {
  id: number;
  tableNumber: number;
  qrCode: string;
  location: string;
  capacity: number;
  status: "active" | "inactive";
  createdAt: string;
}

export default function AdminQRTablesPage() {
  const [tables, setTables] = useState<Table[]>([
    {
      id: 1,
      tableNumber: 1,
      qrCode: `https://yourrestaurant.com/order/table/1`,
      location: "Area Utama",
      capacity: 4,
      status: "active",
      createdAt: "2025-01-15",
    },
    {
      id: 2,
      tableNumber: 2,
      qrCode: `https://yourrestaurant.com/order/table/2`,
      location: "Area Utama",
      capacity: 2,
      status: "active",
      createdAt: "2025-01-15",
    },
    {
      id: 3,
      tableNumber: 5,
      qrCode: `https://yourrestaurant.com/order/table/5`,
      location: "VIP Room",
      capacity: 6,
      status: "active",
      createdAt: "2025-01-15",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [tableToDelete, setTableToDelete] = useState<number | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    tableNumber: "",
    location: "",
    capacity: "",
  });

  const printRef = useRef<HTMLDivElement>(null);

  // Filter tables
  const filteredTables = tables.filter(
    (table) =>
      table.tableNumber.toString().includes(searchQuery) ||
      table.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle add table
  const handleAddTable = (e: React.FormEvent) => {
    e.preventDefault();
    const newTable: Table = {
      id: tables.length + 1,
      tableNumber: Number(formData.tableNumber),
      qrCode: `https://yourrestaurant.com/order/table/${formData.tableNumber}`,
      location: formData.location,
      capacity: Number(formData.capacity),
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setTables([...tables, newTable]);
    setShowAddModal(false);
    setFormData({ tableNumber: "", location: "", capacity: "" });
  };

  // Handle delete table
  const handleDeleteTable = (id: number) => {
    setTableToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (tableToDelete) {
      setTables(tables.filter((table) => table.id !== tableToDelete));
      setShowDeleteConfirm(false);
      setTableToDelete(null);
    }
  };

  // Handle preview
  const handlePreview = (table: Table) => {
    setSelectedTable(table);
    setShowPreviewModal(true);
  };

  // Handle download QR Code
  const handleDownload = (table: Table) => {
    // In production, you would generate actual QR code image here
    alert(`Download QR Code untuk Meja ${table.tableNumber}`);
  };

  // Handle print
  const handlePrint = (table: Table) => {
    setSelectedTable(table);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  // Handle bulk print
  const handleBulkPrint = () => {
    alert("Mencetak semua QR Code meja...");
    window.print();
  };

  // Generate QR Code SVG placeholder
  const QRCodePlaceholder = ({ size = 200, data }: { size?: number; data: string }) => (
    <div
      className="bg-white border-4 border-gray-800 rounded-lg flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <div className="grid grid-cols-8 gap-1 p-2">
        {Array.from({ length: 64 }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 ${
              Math.random() > 0.5 ? "bg-gray-800" : "bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Kelola QR Meja</h1>
          <p className="text-gray-600 mt-1">Buat dan kelola QR code untuk setiap meja</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleBulkPrint}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-5 rounded-xl transition-all"
          >
            <Printer size={20} /> Cetak Semua
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded-xl transition-all shadow-lg hover:shadow-xl"
          >
            <Plus size={20} /> Tambah Meja
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Meja</p>
              <p className="text-2xl font-bold text-gray-800">{tables.length}</p>
            </div>
            <QrCode className="text-blue-500" size={40} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Meja Aktif</p>
              <p className="text-2xl font-bold text-green-600">
                {tables.filter((t) => t.status === "active").length}
              </p>
            </div>
            <Grid3x3 className="text-green-500" size={40} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Kapasitas</p>
              <p className="text-2xl font-bold text-purple-600">
                {tables.reduce((sum, t) => sum + t.capacity, 0)} Kursi
              </p>
            </div>
            <List className="text-purple-500" size={40} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Search */}
          <div className="flex-1 relative w-full">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Cari nomor meja atau lokasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "grid"
                  ? "bg-white text-blue-600 shadow-md"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <Grid3x3 size={20} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "list"
                  ? "bg-white text-blue-600 shadow-md"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Tables Display */}
      {viewMode === "grid" ? (
        // Grid View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredTables.map((table) => (
              <motion.div
                key={table.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
              >
                {/* QR Code Preview */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 flex items-center justify-center">
                  <QRCodePlaceholder size={150} data={table.qrCode} />
                </div>

                {/* Table Info */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800">
                      Meja {table.tableNumber}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        table.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {table.status === "active" ? "Aktif" : "Nonaktif"}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Lokasi:</span> {table.location}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Kapasitas:</span>{" "}
                      {table.capacity} orang
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handlePreview(table)}
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                    >
                      <Eye size={16} />
                      Preview
                    </button>
                    <button
                      onClick={() => handleDownload(table)}
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
                    >
                      <Download size={16} />
                      Download
                    </button>
                    <button
                      onClick={() => handlePrint(table)}
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium"
                    >
                      <Printer size={16} />
                      Print
                    </button>
                    <button
                      onClick={() => handleDeleteTable(table.id)}
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                    >
                      <Trash2 size={16} />
                      Hapus
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        // List View
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Nomor Meja
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Lokasi
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Kapasitas
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTables.map((table) => (
                <tr key={table.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <QrCode className="text-blue-600" size={20} />
                      </div>
                      <span className="font-semibold text-gray-800">
                        Meja {table.tableNumber}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{table.location}</td>
                  <td className="px-6 py-4 text-gray-700">{table.capacity} orang</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        table.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {table.status === "active" ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handlePreview(table)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Preview"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleDownload(table)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Download"
                      >
                        <Download size={18} />
                      </button>
                      <button
                        onClick={() => handlePrint(table)}
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        title="Print"
                      >
                        <Printer size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteTable(table.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Table Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex justify-between items-center rounded-t-2xl">
              <h2 className="text-2xl font-bold text-white">Tambah Meja Baru</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <X size={24} className="text-white" />
              </button>
            </div>

            <form onSubmit={handleAddTable} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nomor Meja *
                </label>
                <input
                  type="number"
                  required
                  value={formData.tableNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, tableNumber: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Contoh: 1"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Lokasi *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Contoh: Area Utama"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Kapasitas (Orang) *
                </label>
                <input
                  type="number"
                  required
                  value={formData.capacity}
                  onChange={(e) =>
                    setFormData({ ...formData, capacity: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Contoh: 4"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
                >
                  Tambah Meja
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && selectedTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg"
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex justify-between items-center rounded-t-2xl">
              <h2 className="text-2xl font-bold text-white">
                QR Code Meja {selectedTable.tableNumber}
              </h2>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <X size={24} className="text-white" />
              </button>
            </div>

            <div className="p-8">
              <div className="bg-gray-50 rounded-2xl p-8 mb-6">
                <div className="flex flex-col items-center">
                  <QRCodePlaceholder size={250} data={selectedTable.qrCode} />
                  <div className="mt-6 text-center">
                    <h3 className="text-3xl font-bold text-gray-800 mb-2">
                      MEJA {selectedTable.tableNumber}
                    </h3>
                    <p className="text-gray-600 mb-1">{selectedTable.location}</p>
                    <p className="text-sm text-gray-500">
                      Kapasitas: {selectedTable.capacity} orang
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800 text-center font-medium">
                  Scan QR Code untuk melihat menu dan melakukan pemesanan
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleDownload(selectedTable)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-colors"
                >
                  <Download size={18} />
                  Download
                </button>
                <button
                  onClick={() => handlePrint(selectedTable)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold transition-colors"
                >
                  <Printer size={18} />
                  Print
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md"
          >
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Trash2 size={32} className="text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Hapus Meja?</h3>
              <p className="text-gray-600 mb-6">
                Apakah Anda yakin ingin menghapus meja ini? Tindakan ini tidak dapat
                dibatalkan.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition-colors"
                >
                  Ya, Hapus
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-area,
          .print-area * {
            visibility: visible;
          }
          .print-area {
            position: absolute;
            left: 0;
            top: 0;
          }
        }
      `}</style>
    </motion.div>
  );
}
