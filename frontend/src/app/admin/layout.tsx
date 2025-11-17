// frontend/src/app/admin/layout.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  Menu, 
  BarChart2, 
  ClipboardList, 
  QrCode, 
  LogOut,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  User,
  Settings,
  Bell,
  Search
} from "lucide-react"; 

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const menuItems = [
    { title: "Dashboard", href: "/admin", icon: Home },
    { title: "Menu", href: "/admin/menus", icon: Menu },
    { title: "Category", href: "/admin/categories", icon: BarChart2 },
    { title: "Pesanan", href: "/admin/orders", icon: ClipboardList, badge: 3 },
    { title: "QR-Meja", href: "/admin/qr-tables", icon: QrCode },
    { title: "Statistik", href: "/admin/statistics", icon: TrendingUp },
  ];

  const notifications = [
    { id: 1, message: "Pesanan baru dari Meja 5", time: "2 menit lalu", unread: true },
    { id: 2, message: "Menu baru berhasil ditambahkan", time: "1 jam lalu", unread: true },
    { id: 3, message: "Pembayaran berhasil - Meja 3", time: "2 jam lalu", unread: false },
  ];

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
                  transition={{ duration: 0.2 }}
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
            
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-lg bg-blue-800/50 hover:bg-blue-700/50 text-white transition-all ml-auto"
            >
              {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>
        </div>

        {/* User Profile */}
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
              <div className="flex-1">
                <h3 className="text-white font-semibold text-sm">Admin User</h3>
                <p className="text-blue-300 text-xs">admin@restaurant.com</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-transparent">
          <div className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href) && (item.href !== "/admin" || pathname === "/admin");

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all relative group ${
                      isActive
                        ? "bg-white text-blue-900 shadow-lg"
                        : "text-blue-100 hover:bg-blue-800/50 hover:text-white"
                    }`}
                  >
                    {/* Active Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400 rounded-r-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}

                    <div className={`${isActive ? "text-blue-900" : ""}`}>
                      <Icon size={22} />
                    </div>

                    <AnimatePresence mode="wait">
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="font-medium text-sm flex-1"
                        >
                          {item.title}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* Badge */}
                    {item.badge && !collapsed && (
                      <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                        {item.badge}
                      </span>
                    )}

                    {/* Tooltip for collapsed state */}
                    {collapsed && (
                      <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                        {item.title}
                        <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                      </div>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-blue-700/50 space-y-2">
          {/* Settings */}
          <button
            className={`flex items-center gap-3 w-full text-blue-100 hover:bg-blue-800/50 hover:text-white p-3 rounded-xl transition-all group relative ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <Settings size={22} />
            {!collapsed && <span className="font-medium text-sm">Pengaturan</span>}
            
            {collapsed && (
              <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                Pengaturan
                <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
              </div>
            )}
          </button>

          {/* Logout */}
          <button
            className={`flex items-center gap-3 w-full text-red-300 hover:text-red-100 hover:bg-red-900/30 p-3 rounded-xl transition-all group relative ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <LogOut size={22} />
            {!collapsed && <span className="font-medium text-sm">Logout</span>}
            
            {collapsed && (
              <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                Logout
                <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
              </div>
            )}
          </button>
        </div>
      </motion.aside>
      
      {/* Main Content */}
      <motion.main
        animate={{ marginLeft: collapsed ? 80 : 280 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex-1 flex flex-col min-h-screen"
      >
        {/* Top Navigation Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="flex items-center justify-between p-4">
            {/* Search Bar */}
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Cari menu, pesanan, atau meja..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3 ml-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Bell size={22} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Notifications Dropdown */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50"
                    >
                      <div className="p-4 border-b bg-gradient-to-r from-blue-600 to-blue-700">
                        <h3 className="font-semibold text-white">Notifikasi</h3>
                        <p className="text-blue-100 text-xs">
                          {notifications.filter(n => n.unread).length} notifikasi baru
                        </p>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors ${
                              notif.unread ? "bg-blue-50" : ""
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-2 h-2 rounded-full mt-2 ${notif.unread ? "bg-blue-600" : "bg-gray-300"}`}></div>
                              <div className="flex-1">
                                <p className="text-sm text-gray-800 font-medium">{notif.message}</p>
                                <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 text-center border-t">
                        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                          Lihat Semua Notifikasi
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Avatar */}
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
                <User size={20} className="text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6">
          {children}
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-4 px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-sm text-gray-600">
              © 2025 Restaurant Admin. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-gray-600">
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Support</a>
            </div>
          </div>
        </footer>
      </motion.main>
    </div>
  );
}
