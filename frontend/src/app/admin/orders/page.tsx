// frontend/src/app/admin/orders/page.tsx

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle, 
  Clock, 
  UtensilsCrossed, 
  Eye, 
  ClipboardList,
  X,
  Filter,
  Search,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Bell,
  Users,
  Calendar,
  Download,
  Layers
} from "lucide-react";

type OrderStatus = "PENDING" | "PREPARING" | "DONE" | "CANCELLED";
type FilterTab = "ALL" | OrderStatus;

interface OrderItem {
  name: string;
  qty: number;
  price: number;
  note?: string;
}

interface Order {
  id: number;
  customerName: string;
  tableNumber: number;
  totalPrice: number;
  status: OrderStatus;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 101,
      customerName: "Budi Santoso",
      tableNumber: 5,
      totalPrice: 45000,
      status: "PENDING",
      items: [
        { name: "Nasi Goreng Spesial", qty: 1, price: 25000 },
        { name: "Es Teh Manis", qty: 2, price: 5000 },
        { name: "Ayam Goreng", qty: 1, price: 15000 },
      ],
      createdAt: "2025-11-17T17:30:00",
      updatedAt: "2025-11-17T17:30:00",
    },
    {
      id: 102,
      customerName: "Ayu Lestari",
      tableNumber: 12,
      totalPrice: 20000,
      status: "PREPARING",
      items: [{ name: "Ayam Geprek Sambal", qty: 1, price: 20000 }],
      createdAt: "2025-11-17T17:25:00",
      updatedAt: "2025-11-17T17:28:00",
    },
    {
      id: 103,
      customerName: "Dedi Kusuma",
      tableNumber: 1,
      totalPrice: 75000,
      status: "DONE",
      items: [
        { name: "Sate Ayam", qty: 2, price: 30000 },
        { name: "Air Mineral", qty: 3, price: 5000 },
      ],
      createdAt: "2025-11-17T17:15:00",
      updatedAt: "2025-11-17T17:40:00",
    },
    {
      id: 104,
      customerName: "Siti Nurhaliza",
      tableNumber: 8,
      totalPrice: 35000,
      status: "PENDING",
      items: [
        { name: "Mie Goreng", qty: 1, price: 20000 },
        { name: "Jus Jeruk", qty: 1, price: 15000 },
      ],
      createdAt: "2025-11-17T17:35:00",
      updatedAt: "2025-11-17T17:35:00",
    },
    {
      id: 105,
      customerName: "Andi Wijaya",
      tableNumber: 3,
      totalPrice: 50000,
      status: "PREPARING",
      items: [
        { name: "Nasi Goreng", qty: 1, price: 25000 },
        { name: "Ayam Bakar", qty: 1, price: 25000 },
      ],
      createdAt: "2025-11-17T17:20:00",
      updatedAt: "2025-11-17T17:32:00",
    },
    {
      id: 106,
      customerName: "Rina Putri",
      tableNumber: 7,
      totalPrice: 60000,
      status: "DONE",
      items: [
        { name: "Soto Ayam", qty: 2, price: 30000 },
      ],
      createdAt: "2025-11-17T17:10:00",
      updatedAt: "2025-11-17T17:35:00",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterTab>("ALL");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [newOrderAlert, setNewOrderAlert] = useState(false);

  // Filter tabs configuration
  const filterTabs: Array<{
    id: FilterTab;
    label: string;
    icon: any;
    color: string;
    bgColor: string;
    borderColor: string;
  }> = [
    {
      id: "ALL",
      label: "Semua",
      icon: Layers,
      color: "text-gray-700",
      bgColor: "bg-gray-100",
      borderColor: "border-gray-300",
    },
    {
      id: "PENDING",
      label: "Menunggu",
      icon: Clock,
      color: "text-yellow-700",
      bgColor: "bg-yellow-100",
      borderColor: "border-yellow-300",
    },
    {
      id: "PREPARING",
      label: "Diproses",
      icon: UtensilsCrossed,
      color: "text-blue-700",
      bgColor: "bg-blue-100",
      borderColor: "border-blue-300",
    },
    {
      id: "DONE",
      label: "Selesai",
      icon: CheckCircle,
      color: "text-green-700",
      bgColor: "bg-green-100",
      borderColor: "border-green-300",
    },
  ];

  // Filter orders based on active tab and search query
  const getFilteredOrders = () => {
    let filtered = orders;

    // Filter by status tab
    if (activeFilter !== "ALL") {
      filtered = filtered.filter((order) => order.status === activeFilter);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.tableNumber.toString().includes(searchQuery) ||
          order.id.toString().includes(searchQuery)
      );
    }

    return filtered;
  };

  // Group filtered orders by status for kanban view
  const getOrdersByStatus = (status: OrderStatus) => {
    return orders.filter((order) => order.status === status);
  };

  const filteredOrders = getFilteredOrders();
  const pendingOrders = getOrdersByStatus("PENDING");
  const preparingOrders = getOrdersByStatus("PREPARING");
  const doneOrders = getOrdersByStatus("DONE");

  // Statistics
  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "PENDING").length,
    preparing: orders.filter((o) => o.status === "PREPARING").length,
    done: orders.filter((o) => o.status === "DONE").length,
    totalRevenue: orders
      .filter((o) => o.status === "DONE")
      .reduce((sum, o) => sum + o.totalPrice, 0),
  };

  // Get count for each filter tab
  const getTabCount = (tabId: FilterTab) => {
    if (tabId === "ALL") return orders.length;
    return orders.filter(o => o.status === tabId).length;
  };

  // Get status badge color
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "PREPARING":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "DONE":
        return "bg-green-100 text-green-700 border-green-300";
      case "CANCELLED":
        return "bg-red-100 text-red-700 border-red-300";
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "PENDING":
        return <Clock size={16} />;
      case "PREPARING":
        return <UtensilsCrossed size={16} />;
      case "DONE":
        return <CheckCircle size={16} />;
      case "CANCELLED":
        return <X size={16} />;
    }
  };

  const updateOrderStatus = (id: number, newStatus: OrderStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id
          ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
          : order
      )
    );

    setNewOrderAlert(true);
    setTimeout(() => setNewOrderAlert(false), 3000);
  };

  const viewDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Wide Order Card Component (for filtered view) - Horizontal Layout
  const WideOrderCard = ({ order }: { order: Order }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden border-l-4"
      style={{
        borderLeftColor:
          order.status === "PENDING"
            ? "#EAB308"
            : order.status === "PREPARING"
            ? "#3B82F6"
            : "#10B981",
      }}
    >
      <div className="flex flex-col md:flex-row h-full">
        {/* Left Section - Order Info (70%) */}
        <div className="flex-1 p-6 space-y-4">
          {/* Header with Status Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border flex items-center gap-1 ${getStatusBadge(
                  order.status
                )}`}
              >
                {getStatusIcon(order.status)}
                {order.status}
              </span>
              <span className="text-sm font-bold text-gray-500">
                Order #{order.id}
              </span>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Calendar size={14} />
                {formatTime(order.createdAt)}
              </span>
            </div>
          </div>

          {/* Customer Info with Avatar */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
              {order.customerName.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                {order.customerName}
              </h3>
              <p className="text-gray-600 flex items-center gap-2 text-sm">
                <Users size={16} />
                Meja {order.tableNumber}
              </p>
            </div>
          </div>

          {/* Order Items in Grid */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 font-semibold mb-3 flex items-center gap-2">
              <ClipboardList size={16} />
              {order.items.length} Item Pesanan:
            </p>
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center bg-white px-3 py-2 rounded-lg"
                >
                  <span className="text-sm text-gray-700 font-medium">
                    {item.name}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">
                      x{item.qty}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      Rp {(item.price * item.qty).toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total Price */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Pembayaran</p>
              <p className="text-3xl font-extrabold text-blue-600">
                Rp {order.totalPrice.toLocaleString("id-ID")}
              </p>
            </div>
            <button
              onClick={() => viewDetails(order)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition px-4 py-2 rounded-lg hover:bg-blue-50"
            >
              <Eye size={18} />
              Detail Lengkap
            </button>
          </div>
        </div>

        {/* Right Section - Actions (30%) */}
        <div className="w-full md:w-64 bg-gray-50 p-6 flex flex-col justify-center gap-3 border-t md:border-t-0 md:border-l">
          <div className="text-center mb-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
              Aksi Pesanan
            </p>
            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto"></div>
          </div>

          {order.status === "PENDING" && (
            <>
              <button
                onClick={() => updateOrderStatus(order.id, "PREPARING")}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-semibold transition shadow-md hover:shadow-lg"
              >
                <UtensilsCrossed size={18} />
                Proses Pesanan
              </button>
              <button
                onClick={() => updateOrderStatus(order.id, "CANCELLED")}
                className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 py-3.5 rounded-xl font-semibold transition border border-red-200"
              >
                <X size={18} />
                Batalkan Pesanan
              </button>
            </>
          )}

          {order.status === "PREPARING" && (
            <>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-2">
                <div className="flex items-center gap-2 text-blue-700 mb-2">
                  <UtensilsCrossed size={16} />
                  <span className="text-xs font-semibold">SEDANG DIPROSES</span>
                </div>
                <p className="text-xs text-blue-600">
                  Pesanan sedang disiapkan di dapur
                </p>
              </div>
              <button
                onClick={() => updateOrderStatus(order.id, "DONE")}
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-xl font-semibold transition shadow-md hover:shadow-lg"
              >
                <CheckCircle size={18} />
                Tandai Selesai
              </button>
            </>
          )}

          {order.status === "DONE" && (
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
              <CheckCircle size={40} className="text-green-600 mx-auto mb-3" />
              <p className="text-green-700 font-bold text-sm">
                Pesanan Selesai
              </p>
              <p className="text-green-600 text-xs mt-2">
                {formatTime(order.updatedAt)}
              </p>
            </div>
          )}

          {/* Additional Info */}
          <div className="mt-auto pt-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 space-y-2">
              <div className="flex items-center gap-2">
                <Clock size={12} />
                <span>Dibuat: {formatTime(order.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={12} />
                <span>Update: {formatTime(order.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Compact Order Card Component (for kanban columns)
  const CompactOrderCard = ({ order }: { order: Order }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4 cursor-pointer border border-gray-100"
      onClick={() => viewDetails(order)}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-gray-500">#{order.id}</span>
        <span className="text-xs text-gray-500 flex items-center gap-1">
          <Clock size={12} />
          {formatTime(order.createdAt)}
        </span>
      </div>

      <div className="mb-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {order.customerName.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-800 truncate text-sm">
              {order.customerName}
            </h3>
            <p className="text-xs text-gray-600">Meja {order.tableNumber}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-3 mb-3">
        <p className="text-xs text-gray-600 font-semibold mb-2">
          {order.items.length} Item:
        </p>
        <ul className="space-y-1">
          {order.items.slice(0, 2).map((item, idx) => (
            <li key={idx} className="text-xs text-gray-700 flex justify-between">
              <span className="truncate flex-1">• {item.name}</span>
              <span className="font-medium ml-2">x{item.qty}</span>
            </li>
          ))}
          {order.items.length > 2 && (
            <li className="text-xs text-blue-600 font-medium">
              +{order.items.length - 2} lainnya
            </li>
          )}
        </ul>
      </div>

      <div className="mb-3 pt-3 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600">Total:</span>
          <span className="text-base font-bold text-blue-600">
            Rp {order.totalPrice.toLocaleString("id-ID")}
          </span>
        </div>
      </div>

      <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
        {order.status === "PENDING" && (
          <>
            <button
              onClick={() => updateOrderStatus(order.id, "PREPARING")}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold text-sm transition"
            >
              <UtensilsCrossed size={16} /> Proses
            </button>
            <button
              onClick={() => updateOrderStatus(order.id, "CANCELLED")}
              className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-lg font-semibold text-sm transition"
            >
              <X size={16} /> Batalkan
            </button>
          </>
        )}

        {order.status === "PREPARING" && (
          <button
            onClick={() => updateOrderStatus(order.id, "DONE")}
            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold text-sm transition"
          >
            <CheckCircle size={16} /> Selesai
          </button>
        )}

        {order.status === "DONE" && (
          <div className="text-center py-2 bg-green-50 text-green-700 rounded-lg text-sm font-semibold flex items-center justify-center gap-2">
            <CheckCircle size={16} /> Selesai
          </div>
        )}
      </div>
    </motion.div>
  );

  // Column Component
  const OrderColumn = ({
    title,
    icon: Icon,
    count,
    orders,
    color,
  }: {
    title: string;
    icon: any;
    count: number;
    orders: Order[];
    color: string;
  }) => (
    <div className="flex-1 min-w-[300px]">
      <div className={`rounded-xl p-4 mb-4 ${color}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon size={20} />
            <h2 className="font-bold text-lg">{title}</h2>
          </div>
          <span className="bg-white bg-opacity-80 px-3 py-1 rounded-full text-sm font-bold">
            {count}
          </span>
        </div>
      </div>
      <div className="space-y-3 max-h-[calc(100vh-400px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <AnimatePresence>
          {orders.length === 0 ? (
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <p className="text-gray-400 text-sm">Tidak ada pesanan</p>
            </div>
          ) : (
            orders.map((order) => <CompactOrderCard key={order.id} order={order} />)
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  // Determine if we should show single column or kanban view
  const showSingleColumn = activeFilter !== "ALL" || searchQuery !== "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manajemen Pesanan</h1>
          <p className="text-gray-600 mt-1">Monitor dan kelola semua pesanan real-time</p>
        </div>
        <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-5 rounded-xl transition-all">
          <Download size={20} /> Ekspor Data
        </button>
      </div>

      {/* Alert */}
      <AnimatePresence>
        {newOrderAlert && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2"
          >
            <Bell size={20} />
            <span className="font-medium">Status pesanan berhasil diperbarui!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-2">
            <ShoppingCart className="text-blue-500" size={24} />
            <TrendingUp className="text-green-500" size={16} />
          </div>
          <p className="text-gray-600 text-sm">Total Pesanan</p>
          <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between mb-2">
            <Clock className="text-yellow-500" size={24} />
          </div>
          <p className="text-gray-600 text-sm">Menunggu</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-2">
            <UtensilsCrossed className="text-blue-500" size={24} />
          </div>
          <p className="text-gray-600 text-sm">Diproses</p>
          <p className="text-2xl font-bold text-blue-600">{stats.preparing}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="text-green-500" size={24} />
          </div>
          <p className="text-gray-600 text-sm">Selesai</p>
          <p className="text-2xl font-bold text-green-600">{stats.done}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-md p-5 text-white">
          <div className="flex items-center justify-between mb-2">
            <DollarSign size={24} />
          </div>
          <p className="text-blue-100 text-sm">Pendapatan Hari Ini</p>
          <p className="text-2xl font-bold">
            Rp {stats.totalRevenue.toLocaleString("id-ID")}
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex flex-col gap-4">
          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeFilter === tab.id;
              const count = getTabCount(tab.id);

              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                    isActive
                      ? `${tab.bgColor} ${tab.color} ${tab.borderColor} border-2 shadow-md`
                      : "bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      isActive ? "bg-white bg-opacity-80" : "bg-gray-200"
                    }`}
                  >
                    {count}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Cari berdasarkan nama, nomor meja, atau ID pesanan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Active Filter Indicator */}
          {(activeFilter !== "ALL" || searchQuery) && (
            <div className="flex items-center gap-2 text-sm flex-wrap">
              <span className="text-gray-600">Filter aktif:</span>
              {activeFilter !== "ALL" && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium flex items-center gap-1">
                  {filterTabs.find(t => t.id === activeFilter)?.label}
                  <button
                    onClick={() => setActiveFilter("ALL")}
                    className="hover:bg-blue-200 rounded-full p-0.5"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-medium flex items-center gap-1">
                  Pencarian: "{searchQuery}"
                  <button
                    onClick={() => setSearchQuery("")}
                    className="hover:bg-gray-200 rounded-full p-0.5"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
              <button
                onClick={() => {
                  setActiveFilter("ALL");
                  setSearchQuery("");
                }}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Reset semua filter
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-4 text-sm text-gray-600">
        Menampilkan <span className="font-bold text-gray-800">{filteredOrders.length}</span> pesanan
        {activeFilter !== "ALL" && ` dengan status "${filterTabs.find(t => t.id === activeFilter)?.label}"`}
        {searchQuery && ` yang sesuai dengan pencarian`}
      </div>

      {/* Conditional View: Single Column or Kanban Board */}
      {showSingleColumn ? (
        // Single Column View (when filter is active)
        <div className="space-y-4">
          <AnimatePresence>
            {filteredOrders.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-white rounded-xl shadow-lg"
              >
                <ClipboardList size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  Tidak ada pesanan yang sesuai dengan filter
                </p>
              </motion.div>
            ) : (
              filteredOrders.map((order) => (
                <WideOrderCard key={order.id} order={order} />
              ))
            )}
          </AnimatePresence>
        </div>
      ) : (
        // Kanban Board View (when showing all)
        <div className="flex gap-4 overflow-x-auto pb-4">
          <OrderColumn
            title="Menunggu"
            icon={Clock}
            count={pendingOrders.length}
            orders={pendingOrders}
            color="bg-yellow-100 text-yellow-700"
          />
          <OrderColumn
            title="Diproses"
            icon={UtensilsCrossed}
            count={preparingOrders.length}
            orders={preparingOrders}
            color="bg-blue-100 text-blue-700"
          />
          <OrderColumn
            title="Selesai"
            icon={CheckCircle}
            count={doneOrders.length}
            orders={doneOrders}
            color="bg-green-100 text-green-700"
          />
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex justify-between items-center rounded-t-2xl">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Detail Pesanan #{selectedOrder.id}
                </h2>
                <p className="text-blue-100 text-sm">
                  {formatDate(selectedOrder.createdAt)} - {formatTime(selectedOrder.createdAt)}
                </p>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <X size={24} className="text-white" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Users size={20} className="text-blue-600" />
                  Informasi Pelanggan
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Nama</p>
                    <p className="font-semibold text-gray-800">
                      {selectedOrder.customerName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Nomor Meja</p>
                    <p className="font-semibold text-gray-800">
                      Meja {selectedOrder.tableNumber}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <ClipboardList size={20} className="text-blue-600" />
                  Detail Pesanan
                </h3>
                <div className="border rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">
                          Item
                        </th>
                        <th className="text-center px-4 py-3 text-sm font-semibold text-gray-600">
                          Qty
                        </th>
                        <th className="text-right px-4 py-3 text-sm font-semibold text-gray-600">
                          Harga
                        </th>
                        <th className="text-right px-4 py-3 text-sm font-semibold text-gray-600">
                          Subtotal
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {selectedOrder.items.map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <p className="font-medium text-gray-800">{item.name}</p>
                          </td>
                          <td className="px-4 py-3 text-center text-gray-700">
                            {item.qty}
                          </td>
                          <td className="px-4 py-3 text-right text-gray-700">
                            Rp {item.price.toLocaleString("id-ID")}
                          </td>
                          <td className="px-4 py-3 text-right font-semibold text-gray-800">
                            Rp {(item.qty * item.price).toLocaleString("id-ID")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-blue-50">
                      <tr>
                        <td
                          colSpan={3}
                          className="px-4 py-4 text-right font-bold text-gray-800"
                        >
                          Total:
                        </td>
                        <td className="px-4 py-4 text-right font-bold text-blue-600 text-lg">
                          Rp {selectedOrder.totalPrice.toLocaleString("id-ID")}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Action Buttons */}
              {selectedOrder.status !== "DONE" && selectedOrder.status !== "CANCELLED" && (
                <div className="flex gap-3 pt-4 border-t">
                  {selectedOrder.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => {
                          updateOrderStatus(selectedOrder.id, "PREPARING");
                          setShowDetailModal(false);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
                      >
                        <UtensilsCrossed size={18} /> Proses Pesanan
                      </button>
                      <button
                        onClick={() => {
                          updateOrderStatus(selectedOrder.id, "CANCELLED");
                          setShowDetailModal(false);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition"
                      >
                        <X size={18} /> Batalkan
                      </button>
                    </>
                  )}
                  {selectedOrder.status === "PREPARING" && (
                    <button
                      onClick={() => {
                        updateOrderStatus(selectedOrder.id, "DONE");
                        setShowDetailModal(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
                    >
                      <CheckCircle size={18} /> Tandai Selesai
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
