"use client";

const categories = ["Semua", "Makanan", "Minuman", "Cemilan", "Paket Hemat"];

export default function CategoryList() {
  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
      {categories.map((cat) => (
        <button
          key={cat}
          className="px-4 py-2 whitespace-nowrap rounded-lg bg-white border shadow-sm hover:bg-orange-500 hover:text-white transition"
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
