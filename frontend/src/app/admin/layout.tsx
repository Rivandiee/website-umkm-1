// frontend/src/app/admin/layout.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, Menu, BarChart2, ClipboardList, QrCode, LogOut, TrendingUp,
  ChevronLeft, ChevronRight, User, Settings, Bell, Search, Loader2
} from "lucide-react"; 

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // State untuk data admin & loading check
  const [adminUser, setAdminUser] = useState<{name: string, role: string} | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // --- 1. CEK AUTENTIKASI ---
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const userStr = localStorage.getItem("admin_user");

    if (!token) {
      router.replace("/admin-login");
    } else {
      if (userStr) {
        setAdminUser(JSON.parse(userStr));
      }
      setIsCheckingAuth(false);
    }
  }, [router]);

  // --- 2. FUNGSI LOGOUT ---
  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
      router.replace("/admin-login");
    }
  };

  const menuItems = [
    { title: "Dashboard", href: "/admin", icon: Home },
    { title: "Menu", href: "/admin/menus", icon: Menu },
    { title: "Category", href: "/admin/categories", icon: BarChart2 },
    { title: "Pesanan", href: "/admin/orders", icon: ClipboardList, badge: 3 },
    { title: "QR-Meja", href: "/admin/qr-tables", icon: QrCode },
    { title: "Statistik", href: "/admin/statistics", icon: TrendingUp },
  ];

  // Tampilkan loading saat mengecek token agar tidak flash content
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 280 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 h-full bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 shadow-2xl flex flex-col z-50"
      >
        {/* Header */}
        <div className="p-6 border-b border-blue-700/50">
          <div className="flex items-center justify-between">
            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">R</span>
                  </div>
                  <div>
                    <h1 className="text-white font-bold text-xl">Restaurant</h1>
                    <p className="text-blue-300 text-xs">Admin Panel</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <button onClick={() => setCollapsed(!collapsed)} className="p-2 rounded-lg bg-blue-800/50 hover:bg-blue-700/50 text-white transition-all ml-auto">
              {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>
        </div>

        {/* User Profile (Dinamis) */}
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="p-6 border-b border-blue-700/50"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                <User size={24} className="text-white" />
              </div>
              <div className="flex-1 overflow-hidden">
                <h3 className="text-white font-semibold text-sm truncate">
                  {adminUser?.name || "Admin"}
                </h3>
                <p className="text-blue-300 text-xs uppercase">
                  {adminUser?.role || "CASHIER"}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-transparent">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href; // Exact match untuk highlight yang lebih akurat

              return (
                <Link key={item.title} href={item.href}>
                  <div className={`flex items-center gap-3 p-3 rounded-xl transition-all relative group ${
                      isActive ? "bg-white text-blue-900 shadow-lg" : "text-blue-100 hover:bg-blue-800/50 hover:text-white"
                    }`}
                  >
                    {isActive && <motion.div layoutId="activeTab" className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400 rounded-r-full" />}
                    <Icon size={22} />
                    {!collapsed && <span className="font-medium text-sm flex-1">{item.title}</span>}
                    {item.badge && !collapsed && (
                      <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">{item.badge}</span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-blue-700/50">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 w-full text-red-300 hover:text-red-100 hover:bg-red-900/30 p-3 rounded-xl transition-all group ${collapsed ? "justify-center" : ""}`}
          >
            <LogOut size={22} />
            {!collapsed && <span className="font-medium text-sm">Logout</span>}
          </button>
        </div>
      </motion.aside>
      
      {/* Main Content */}
      <motion.main
        animate={{ marginLeft: collapsed ? 80 : 280 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex-1 flex flex-col min-h-screen"
      >
        {/* Topbar */}
        <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40 p-4 flex justify-between items-center">
           <h2 className="text-xl font-semibold text-gray-800">
             {/* Menampilkan judul berdasarkan path sederhana */}
             {menuItems.find(m => m.href === pathname)?.title || "Dashboard"}
           </h2>
           <div className="flex items-center gap-4">
             <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
               <Bell size={22} />
               <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
             </button>
             <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
               {adminUser?.name?.charAt(0) || "A"}
             </div>
           </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          {children}
        </div>
      </motion.main>
    </div>
  );
}