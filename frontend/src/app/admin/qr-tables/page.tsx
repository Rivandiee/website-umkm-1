"use client";

import { useState, useEffect } from "react";
import api from "../../../lib/axios";
import { QrCode, Plus, Trash2, Printer } from "lucide-react";

interface Table {
  id: number;
  number: number;
  location: string;
  capacity: number;
  qrCode: string;
  isOccupied: boolean;
}

export default function AdminQRTablesPage() {
  const [tables, setTables] = useState<Table[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ number: "", location: "", capacity: "" });

  const fetchTables = async () => {
    try {
      const res = await api.get("/admin/tables");
      setTables(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const handleAddTable = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/admin/tables", {
        number: Number(formData.number),
        location: formData.location,
        capacity: Number(formData.capacity)
      });
      await fetchTables();
      setShowModal(false);
      setFormData({ number: "", location: "", capacity: "" });
    } catch (error: any) {
      alert(error.response?.data?.message || "Gagal membuat meja");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Hapus meja ini?")) {
      await api.delete(`/admin/tables/${id}`);
      fetchTables();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manajemen Meja & QR</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} /> Tambah Meja
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tables.map((table) => (
          <div key={table.id} className="bg-white p-4 rounded-xl shadow relative group">
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
              <button onClick={() => handleDelete(table.id)} className="text-red-500 bg-red-50 p-2 rounded-full">
                <Trash2 size={16} />
              </button>
            </div>
            
            <div className="text-center mb-4">
              <h3 className="text-3xl font-bold text-gray-800 mb-1">#{table.number}</h3>
              <p className="text-sm text-gray-500">{table.location}</p>
            </div>

            {/* QR Code Placeholder - Gunakan library QR code di production */}
            <div className="bg-gray-100 aspect-square rounded-lg flex items-center justify-center mb-4 overflow-hidden">
              {table.qrCode ? (
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(table.qrCode)}`} 
                  alt={`QR Meja ${table.number}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <QrCode size={64} className="text-gray-400" />
              )}
            </div>

            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Kap: {table.capacity} Org</span>
              <span className={table.isOccupied ? "text-red-500" : "text-green-500"}>
                {table.isOccupied ? "Terisi" : "Kosong"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Tambah Meja</h2>
            <form onSubmit={handleAddTable} className="space-y-4">
              <input 
                type="number" placeholder="Nomor Meja" required className="w-full border p-2 rounded"
                value={formData.number} onChange={e => setFormData({...formData, number: e.target.value})}
              />
              <input 
                type="text" placeholder="Lokasi (Contoh: Indoor)" required className="w-full border p-2 rounded"
                value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})}
              />
              <input 
                type="number" placeholder="Kapasitas" required className="w-full border p-2 rounded"
                value={formData.capacity} onChange={e => setFormData({...formData, capacity: e.target.value})}
              />
              <div className="flex gap-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2 border rounded">Batal</button>
                <button type="submit" className="flex-1 py-2 bg-blue-600 text-white rounded">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}