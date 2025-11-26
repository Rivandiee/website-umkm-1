"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../../../lib/axios"; // Import API
import { 
  PlusCircle, Edit, Trash2, Search, Eye, EyeOff, Filter, X, Upload, Loader2
} from "lucide-react";

// URL helper untuk gambar
const getImageUrl = (path: string) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}${path}`;
};

// Interface Menu sesuaikan dengan respon backend
interface Menu {
  id: number;
  name: string;
  categoryId: number; // ID kategori dari DB
  category: { id: number; name: string }; // Object kategori dari include
  price: number;
  description: string;
  image: string;
  isAvailable: boolean; // Backend pakai isAvailable
}

interface Category {
  id: number;
  name: string;
}

export default function AdminMenusPage() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredMenus, setFilteredMenus] = useState<Menu[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal & Form States
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    price: "",
    description: "",
    image: "",
  });
  
  // Untuk file upload
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  // 1. Fetch Menus & Categories
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [menusRes, catsRes] = await Promise.all([
        api.get("/admin/menus"),
        api.get("/admin/categories")
      ]);
      
      setMenus(menusRes.data.data);
      setCategories(catsRes.data.data);
      setFilteredMenus(menusRes.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Gagal mengambil data menu");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter Logic
  useEffect(() => {
    let filtered = menus;
    if (selectedCategory !== "All") {
      filtered = filtered.filter((menu) => menu.category.name === selectedCategory);
    }
    if (searchQuery) {
      filtered = filtered.filter((menu) =>
        menu.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredMenus(filtered);
  }, [searchQuery, selectedCategory, menus]);

  // Handle Image Select
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Submit (Add/Edit)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Gunakan FormData untuk upload file
    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("categoryId", formData.categoryId);
    payload.append("price", formData.price);
    payload.append("description", formData.description);
    if (imageFile) {
      payload.append("image", imageFile);
    }

    try {
      if (modalMode === "add") {
        await api.post("/admin/menus", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.put(`/admin/menus/${selectedMenu?.id}`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      
      await fetchData(); // Refresh data
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error("Submit error:", error);
      alert("Gagal menyimpan menu");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Menu
  const handleDeleteMenu = async (id: number) => {
    if (confirm("Yakin ingin menghapus menu ini?")) {
      try {
        await api.delete(`/admin/menus/${id}`);
        setMenus(menus.filter((m) => m.id !== id));
      } catch (error) {
        alert("Gagal menghapus menu");
      }
    }
  };

  // Toggle Status (Available/Empty)
  const toggleAvailability = async (menu: Menu) => {
    try {
      await api.patch(`/admin/menus/${menu.id}/status`, {
        isAvailable: !menu.isAvailable
      });
      // Update local state optimistically
      setMenus(menus.map(m => m.id === menu.id ? {...m, isAvailable: !m.isAvailable} : m));
    } catch (error) {
      alert("Gagal mengubah status");
    }
  };

  // Helper: Open Add Modal
  const handleAddClick = () => {
    setModalMode("add");
    resetForm();
    setShowModal(true);
  };

  // Helper: Open Edit Modal
  const handleEditClick = (menu: Menu) => {
    setModalMode("edit");
    setSelectedMenu(menu);
    setFormData({
      name: menu.name,
      categoryId: menu.categoryId.toString(),
      price: menu.price.toString(),
      description: menu.description || "",
      image: menu.image,
    });
    setImagePreview(getImageUrl(menu.image));
    setImageFile(null);
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({ name: "", categoryId: "", price: "", description: "", image: "" });
    setImageFile(null);
    setImagePreview("");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Header & Filter UI ... (sama seperti sebelumnya, sesuaikan handler) */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manajemen Menu</h1>
        <button onClick={handleAddClick} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <PlusCircle size={20} /> Tambah Menu
        </button>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input 
            className="w-full pl-10 p-2 border rounded-lg" 
            placeholder="Cari menu..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <select 
          className="p-2 border rounded-lg"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <option value="All">Semua Kategori</option>
          {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">Loading...</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">Menu</th>
                <th className="px-6 py-3 text-left">Kategori</th>
                <th className="px-6 py-3 text-left">Harga</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredMenus.map(menu => (
                <tr key={menu.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={getImageUrl(menu.image) || "/placeholder.png"} 
                        alt={menu.name} 
                        className="w-12 h-12 rounded-lg object-cover bg-gray-200"
                      />
                      <div>
                        <div className="font-bold">{menu.name}</div>
                        <div className="text-xs text-gray-500 truncate max-w-[200px]">{menu.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {menu.category?.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">Rp {menu.price.toLocaleString('id-ID')}</td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => toggleAvailability(menu)}
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${menu.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                    >
                      {menu.isAvailable ? <Eye size={14} /> : <EyeOff size={14} />}
                      {menu.isAvailable ? 'Aktif' : 'Nonaktif'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => handleEditClick(menu)} className="text-blue-600 hover:bg-blue-50 p-2 rounded"><Edit size={18}/></button>
                      <button onClick={() => handleDeleteMenu(menu.id)} className="text-red-600 hover:bg-red-50 p-2 rounded"><Trash2 size={18}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between">
              <h2 className="text-xl font-bold">{modalMode === 'add' ? 'Tambah Menu' : 'Edit Menu'}</h2>
              <button onClick={() => setShowModal(false)}><X /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">Nama Menu</label>
                <input 
                  type="text" 
                  required 
                  className="w-full border p-2 rounded"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1">Kategori</label>
                  <select 
                    required 
                    className="w-full border p-2 rounded"
                    value={formData.categoryId}
                    onChange={e => setFormData({...formData, categoryId: e.target.value})}
                  >
                    <option value="">Pilih Kategori</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Harga</label>
                  <input 
                    type="number" 
                    required 
                    className="w-full border p-2 rounded"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Deskripsi</label>
                <textarea 
                  className="w-full border p-2 rounded"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Gambar</label>
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded mb-2" />
                )}
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border p-2 rounded"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold disabled:bg-gray-400"
              >
                {isSubmitting ? "Menyimpan..." : "Simpan Menu"}
              </button>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
}