"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../../../lib/axios";
import { 
  PlusCircle, Edit, Trash2, Search, X, Tag
} from "lucide-react";

// Sesuaikan interface
interface Category {
  id: number;
  name: string;
  description?: string;
  _count?: { menus: number }; // Dari prisma include count
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "" });

  const fetchCategories = async () => {
    try {
      const res = await api.get("/admin/categories");
      setCategories(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && selectedId) {
        await api.put(`/admin/categories/${selectedId}`, formData);
      } else {
        await api.post("/admin/categories", formData);
      }
      await fetchCategories();
      setShowModal(false);
      resetForm();
    } catch (error) {
      alert("Gagal menyimpan kategori");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Hapus kategori ini?")) {
      try {
        await api.delete(`/admin/categories/${id}`);
        fetchCategories();
      } catch (error) {
        alert("Gagal menghapus (mungkin masih ada menu terkait)");
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: "", description: "" });
    setIsEditing(false);
    setSelectedId(null);
  };

  const filtered = categories.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Header & Actions */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Kategori Menu</h1>
        <button 
          onClick={() => { resetForm(); setShowModal(true); }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <PlusCircle size={20} /> Tambah
        </button>
      </div>

      {/* List Kategori */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(cat => (
          <div key={cat.id} className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">{cat.name}</h3>
              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                {cat._count?.menus || 0} Menu
              </span>
            </div>
            <p className="text-gray-500 text-sm mb-4 h-10 line-clamp-2">
              {cat.description || "Tidak ada deskripsi"}
            </p>
            <div className="flex gap-2 pt-4 border-t">
              <button 
                onClick={() => {
                  setIsEditing(true);
                  setSelectedId(cat.id);
                  setFormData({ name: cat.name, description: cat.description || "" });
                  setShowModal(true);
                }}
                className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-semibold"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(cat.id)}
                className="px-3 bg-red-50 text-red-600 rounded-lg"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">{isEditing ? 'Edit' : 'Tambah'} Kategori</h2>
              <button onClick={() => setShowModal(false)}><X /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                className="w-full border p-3 rounded-lg" 
                placeholder="Nama Kategori" 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
              <textarea 
                className="w-full border p-3 rounded-lg" 
                placeholder="Deskripsi (Opsional)" 
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold">
                Simpan
              </button>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
}