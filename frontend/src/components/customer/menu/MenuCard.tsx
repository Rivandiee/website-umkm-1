import { ShoppingBag } from "lucide-react";

export default function MenuCard({ name, price, img }: any) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <img
        src={img}
        alt={name}
        className="w-full h-32 object-cover"
      />

      <div className="p-3">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-orange-600 font-bold mt-1">Rp {price}</p>

        <button className="mt-3 w-full bg-orange-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-600 transition">
          <ShoppingBag size={18} /> Pesan
        </button>
      </div>
    </div>
  );
}
