// frontend/src/app/admin/menus/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  PlusCircle, 
  Edit, 
  Trash2, 
  Search,
  Eye,
  EyeOff,
  Filter,
  X,
  Upload,
  Image as ImageIcon
} from "lucide-react";
import Image from "next/image";

// Interface untuk Menu
interface Menu {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string; // Bisa berupa URL atau base64
  available: boolean;
}

export default function AdminMenusPage() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [filteredMenus, setFilteredMenus] = useState<Menu[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [menuToDelete, setMenuToDelete] = useState<number | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
    available: true,
  });

  // Image preview state
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Categories
  const categories = ["All", "Makanan", "Minuman", "Snack", "Dessert"];

  // Load menu data (replace with API call)
  useEffect(() => {
    // Mock data
    const mockMenus: Menu[] = [
      {
        id: 1,
        name: "Nasi Goreng Spesial",
        category: "Makanan",
        price: 25000,
        description: "Nasi goreng dengan telur, ayam, dan sayuran",
        image: "/images/nasi-goreng.jpg",
        available: true,
      },
      {
        id: 2,
        name: "Mie Ayam Bakso",
        category: "Makanan",
        price: 20000,
        description: "Mie ayam dengan bakso dan pangsit",
        image: "/images/mie-ayam.jpg",
        available: true,
      },
      {
        id: 3,
        name: "Es Teh Manis",
        category: "Minuman",
        price: 5000,
        description: "Es teh manis segar",
        image: "/images/es-teh.jpg",
        available: true,
      },
      {
        id: 4,
        name: "Ayam Bakar",
        category: "Makanan",
        price: 30000,
        description: "Ayam bakar bumbu kecap dengan lalapan",
        image: "/images/ayam-bakar.jpg",
        available: false,
      },
    ];

    setMenus(mockMenus);
    setFilteredMenus(mockMenus);
  }, []);

  // Filter menus
  useEffect(() => {
    let filtered = menus;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((menu) => menu.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((menu) =>
        menu.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredMenus(filtered);
  }, [searchQuery, selectedCategory, menus]);

  // Handle form input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validasi tipe file
      if (!file.type.startsWith('image/')) {
        alert('File harus berupa gambar!');
        return;
      }

      // Validasi ukuran file (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file maksimal 5MB!');
        return;
      }

      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData({ ...formData, image: result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
    setFormData({ ...formData, image: "" });
  };

  // Open add modal
  const handleAddMenu = () => {
    setModalMode("add");
    setFormData({
      name: "",
      category: "",
      price: "",
      description: "",
      image: "",
      available: true,
    });
    setImagePreview("");
    setImageFile(null);
    setShowModal(true);
  };

  // Open edit modal
  const handleEditMenu = (menu: Menu) => {
    setModalMode("edit");
    setSelectedMenu(menu);
    setFormData({
      name: menu.name,
      category: menu.category,
      price: menu.price.toString(),
      description: menu.description,
      image: menu.image,
      available: menu.available,
    });
    setImagePreview(menu.image); // Set existing image as preview
    setImageFile(null);
    setShowModal(true);
  };

  // Submit form (add or edit)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (modalMode === "add") {
      // Add new menu
      const newMenu: Menu = {
        id: menus.length + 1,
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        description: formData.description,
        image: formData.image, // Akan berisi base64 string atau URL
        available: formData.available,
      };
      setMenus([...menus, newMenu]);
    } else {
      // Edit existing menu
      setMenus(
        menus.map((menu) =>
          menu.id === selectedMenu?.id
            ? { ...menu, ...formData, price: Number(formData.price) }
            : menu
        )
      );
    }

    setShowModal(false);
    setImagePreview("");
    setImageFile(null);
  };

  // Delete menu
  const handleDeleteMenu = (id: number) => {
    setMenuToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (menuToDelete) {
      setMenus(menus.filter((menu) => menu.id !== menuToDelete));
      setShowDeleteConfirm(false);
      setMenuToDelete(null);
    }
  };

  // Toggle availability
  const toggleAvailability = (id: number) => {
    setMenus(
      menus.map((menu) =>
        menu.id === id ? { ...menu, available: !menu.available } : menu
      )
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manajemen Menu</h1>
          <p className="text-gray-600 mt-1">Kelola semua menu restoran Anda</p>
        </div>
        <button
          onClick={handleAddMenu}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded-xl shadow-lg transition-all hover:shadow-xl"
        >
          <PlusCircle size={20} /> Tambah Menu Baru
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-md mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-600" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-6 mt-4 pt-4 border-t">
          <div className="text-sm">
            <span className="text-gray-600">Total Menu: </span>
            <span className="font-bold text-gray-800">{menus.length}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Tersedia: </span>
            <span className="font-bold text-green-600">
              {menus.filter((m) => m.available).length}
            </span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Tidak Tersedia: </span>
            <span className="font-bold text-red-600">
              {menus.filter((m) => !m.available).length}
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Menu
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Harga
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMenus.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    Tidak ada menu ditemukan
                  </td>
                </tr>
              ) : (
                filteredMenus.map((menu) => (
                  <tr
                    key={menu.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                          {menu.image ? (
                            <img 
                              src={menu.image} 
                              alt={menu.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-gray-400 text-xs">IMG</span>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">
                            {menu.name}
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-1">
                            {menu.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {menu.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-800">
                        Rp {menu.price.toLocaleString("id-ID")}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleAvailability(menu.id)}
                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          menu.available
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-red-100 text-red-700 hover:bg-red-200"
                        }`}
                      >
                        {menu.available ? (
                          <>
                            <Eye size={14} /> Tersedia
                          </>
                        ) : (
                          <>
                            <EyeOff size={14} /> Habis
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEditMenu(menu)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteMenu(menu.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10">
              <h2 className="text-2xl font-bold text-gray-800">
                {modalMode === "add" ? "Tambah Menu Baru" : "Edit Menu"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Menu *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Contoh: Nasi Goreng Spesial"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Kategori *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Pilih Kategori</option>
                  {categories.slice(1).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Harga (Rp) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="25000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Deskripsi
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Deskripsi menu..."
                />
              </div>

              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gambar Menu
                </label>
                
                {/* Image Preview */}
                {imagePreview ? (
                  <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden mb-3 border-2 border-gray-300">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <div className="w-full">
                    <label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-12 h-12 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Klik untuk upload</span> atau drag & drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, JPEG (MAX. 5MB)
                        </p>
                      </div>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}

                <p className="text-xs text-gray-500 mt-2">
                  * Upload gambar dengan resolusi minimal 800x800px untuk hasil terbaik
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="available"
                  checked={formData.available}
                  onChange={(e) =>
                    setFormData({ ...formData, available: e.target.checked })
                  }
                  className="w-4 h-4 text-blue-600"
                />
                <label htmlFor="available" className="text-sm text-gray-700">
                  Menu tersedia
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
                >
                  {modalMode === "add" ? "Tambah Menu" : "Simpan Perubahan"}
                </button>
              </div>
            </form>
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
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Hapus Menu?
              </h3>
              <p className="text-gray-600 mb-6">
                Apakah Anda yakin ingin menghapus menu ini? Tindakan ini tidak
                dapat dibatalkan.
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
    </motion.div>
  );
}
