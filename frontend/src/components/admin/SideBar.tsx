"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Menu, PlusCircle, ClipboardList, DollarSign, LogOut } from "lucide-react";

export default function SideBar() {
  const pathname = usePathname();

  const menuItems = [
    { title: "Dashboard", href: "/admin", icon: Home },
    { title: "Menu", href: "/admin/menus", icon: Menu },
    { title: "Tambah Menu", href: "/admin/add-menu", icon: PlusCircle },
    { title: "Pesanan", href: "/admin/orders", icon: ClipboardList },
    { title: "Transaksi", href: "/admin/transactions", icon: DollarSign },
  ];

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg flex flex-col justify-between">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-10">Admin Panel</h1>
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-blue-100"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-6 border-t border-gray-200">
        <button className="flex items-center gap-3 w-full text-gray-700 hover:text-red-600 hover:bg-red-100 p-3 rounded-lg transition-all">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
