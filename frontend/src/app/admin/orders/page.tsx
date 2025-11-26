// frontend/src/app/admin/orders/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../../lib/axios"; // Import API Helper
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
  Layers,
  QrCode,
  Wallet,
  Loader2
} from "lucide-react";

type OrderStatus = "PENDING" | "PREPARING" | "DONE" | "CANCELLED";
type FilterTab = "ALL" | OrderStatus;
type PaymentMethod = "CASH" | "NONCASH" | "QR"; // Sesuaikan dengan backend/frontend mapping

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
  paymentMethod: PaymentMethod;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterTab>("ALL");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [newOrderAlert, setNewOrderAlert] = useState(false);

  // --- Fetch Orders from API ---
  const fetchOrders = useCallback(async () => {
    try {
      // const res = await api.get("/admin/orders"); // Fetch semua
      // Atau jika ingin filter di server: api.get(`/admin/orders?status=${activeFilter}`)
      // Kita fetch semua dulu untuk client-side filtering yang responsif
      const res = await api.get("/admin/orders");
      
      // Transform data dari Backend ke struktur Frontend
      const mappedOrders = res.data.map((o: any) => ({
        id: o.id,
        customerName: o.customerName || "Guest",
        tableNumber: o.table?.number || 0,
        totalPrice: o.totalPrice,
        status: o.status,
        paymentMethod: o.paymentMethod,
        items: o.items.map((i: any) => ({
          name: i.menu?.name || "Unknown Item",
          qty: i.qty,
          price: i.price,
          note: i.note
        })),
        createdAt: o.createdAt,
        updatedAt: o.updatedAt,
      }));

      setOrders(mappedOrders);
    } catch (error) {
      console.error("Gagal mengambil pesanan:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial Load & Auto Refresh (Polling sederhana setiap 10 detik)
  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  // --- Update Order Status ---
  const handleUpdateStatus = async (id: number, newStatus: OrderStatus) => {
    try {
      // Optimistic Update
      setOrders((prev) => prev.map(o => o.id === id ? { ...o, status: newStatus, updatedAt: new Date().toISOString() } : o));
      
      // Call API
      await api.patch(`/admin/orders/${id}/status`, { status: newStatus });
      
      setNewOrderAlert(true);
      setTimeout(() => setNewOrderAlert(false), 3000);
      
      // Refresh data untuk memastikan sinkron
      fetchOrders();
    } catch (error) {
      console.error("Gagal update status:", error);
      alert("Gagal mengupdate status pesanan");
      fetchOrders(); // Revert jika gagal
    }
  };

  // Filter tabs configuration
  const filterTabs: Array<{
    id: FilterTab;
    label: string;
    icon: any;
    color: string;
    bgColor: string;
    borderColor: string;
    description: string;
  }> = [
    {
      id: "ALL",
      label: "Aktif", // Ubah label agar lebih akurat
      icon: Layers,
      color: "text-gray-700",
      bgColor: "bg-gray-100",
      borderColor: "border-gray-300",
      description: "Menunggu & Diproses",
    },
    {
      id: "PENDING",
      label: "Menunggu",
      icon: Clock,
      color: "text-yellow-700",
      bgColor: "bg-yellow-100",
      borderColor: "border-yellow-300",
      description: "Pesanan baru masuk",
    },
    {
      id: "PREPARING",
      label: "Diproses",
      icon: UtensilsCrossed,
      color: "text-blue-700",
      bgColor: "bg-blue-100",
      borderColor: "border-blue-300",
      description: "Sedang dimasak",
    },
    {
      id: "DONE",
      label: "Selesai",
      icon: CheckCircle,
      color: "text-green-700",
      bgColor: "bg-green-100",
      borderColor: "border-green-300",
      description: "Sudah diantar",
    },
  ];

  // Helper functions for payment method
  const getPaymentBadge = (method: string) => {
    return method === "CASH"
      ? "bg-green-50 text-green-700 border-green-300"
      : "bg-purple-50 text-purple-700 border-purple-300";
  };

  const getPaymentIcon = (method: string) => {
    return method === "CASH" ? <Wallet size={16} /> : <QrCode size={16} />;
  };

  const getPaymentLabel = (method: string) => {
    return method === "CASH" ? "Tunai" : "QRIS";
  };

  // Filter Logic
  const getFilteredOrders = () => {
    let filtered = orders;

    // Filter by status tab
    if (activeFilter !== "ALL") {
      filtered = filtered.filter((order) => order.status === activeFilter);
    } else {
      // Default "ALL" (Active) = PENDING + PREPARING
      filtered = filtered.filter((order) => ["PENDING", "PREPARING"].includes(order.status));
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

    // Sort: PENDING paling atas, lalu berdasarkan waktu terbaru
    return filtered.sort((a, b) => {
        if (a.status === b.status) {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return a.status === 'PENDING' ? -1 : 1;
    });
  };

  const filteredOrders = getFilteredOrders();
  const pendingOrders = orders.filter((o) => o.status === "PENDING");
  const preparingOrders = orders.filter((o) => o.status === "PREPARING");

  // Statistics
  const stats = {
    total: orders.length,
    pending: pendingOrders.length,
    preparing: preparingOrders.length,
    done: orders.filter((o) => o.status === "DONE").length,
    totalRevenue: orders
      .filter((o) => o.status === "DONE")
      .reduce((sum, o) => sum + o.totalPrice, 0),
  };

  const getTabCount = (tabId: FilterTab) => {
    if (tabId === "ALL") return pendingOrders.length + preparingOrders.length;
    return orders.filter(o => o.status === tabId).length;
  };

  // Formatters
  const formatTime = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "PENDING": return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "PREPARING": return "bg-blue-100 text-blue-700 border-blue-300";
      case "DONE": return "bg-green-100 text-green-700 border-green-300";
      case "CANCELLED": return "bg-red-100 text-red-700 border-red-300";
      default: return "bg-gray-100";
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "PENDING": return <Clock size={16} />;
      case "PREPARING": return <UtensilsCrossed size={16} />;
      case "DONE": return <CheckCircle size={16} />;
      case "CANCELLED": return <X size={16} />;
      default: return <Clock size={16} />;
    }
  };

  // --- Components ---

  const WideOrderCard = ({ order }: { order: Order }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden border-l-4"
      style={{
        borderLeftColor:
          order.status === "PENDING" ? "#EAB308" : 
          order.status === "PREPARING" ? "#3B82F6" : 
          order.status === "DONE" ? "#10B981" : "#EF4444",
      }}
    >
      <div className="flex flex-col md:flex-row h-full">
        <div className="flex-1 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-wrap">
              <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border flex items-center gap-1 ${getStatusBadge(order.status)}`}>
                {getStatusIcon(order.status)}
                {order.status}
              </span>
              <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border flex items-center gap-1 ${getPaymentBadge(order.paymentMethod)}`}>
                {getPaymentIcon(order.paymentMethod)}
                {getPaymentLabel(order.paymentMethod)}
              </span>
              <span className="text-sm font-bold text-gray-500">Order #{order.id}</span>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Calendar size={14} />
                {formatTime(order.createdAt)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
              {order.customerName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{order.customerName}</h3>
              <p className="text-gray-600 flex items-center gap-2 text-sm">
                <Users size={16} /> Meja {order.tableNumber}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 font-semibold mb-3 flex items-center gap-2">
              <ClipboardList size={16} /> {order.items.length} Item Pesanan:
            </p>
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center bg-white px-3 py-2 rounded-lg">
                  <span className="text-sm text-gray-700 font-medium">{item.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">x{item.qty}</span>
                    {item.note && <span className="text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded">Note: {item.note}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Pembayaran</p>
              <p className="text-3xl font-extrabold text-blue-600">Rp {order.totalPrice.toLocaleString("id-ID")}</p>
            </div>
            <button onClick={() => { setSelectedOrder(order); setShowDetailModal(true); }} className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition px-4 py-2 rounded-lg hover:bg-blue-50">
              <Eye size={18} /> Detail
            </button>
          </div>
        </div>

        <div className="w-full md:w-64 bg-gray-50 p-6 flex flex-col justify-center gap-3 border-t md:border-t-0 md:border-l">
          {order.status === "PENDING" && (
            <>
              <button onClick={() => handleUpdateStatus(order.id, "PREPARING")} className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-semibold transition shadow-md">
                <UtensilsCrossed size={18} /> Proses
              </button>
              <button onClick={() => handleUpdateStatus(order.id, "CANCELLED")} className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 py-3.5 rounded-xl font-semibold transition border border-red-200">
                <X size={18} /> Tolak
              </button>
            </>
          )}
          {order.status === "PREPARING" && (
            <button onClick={() => handleUpdateStatus(order.id, "DONE")} className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-xl font-semibold transition shadow-md">
              <CheckCircle size={18} /> Selesai
            </button>
          )}
          {order.status === "DONE" && (
             <div className="text-center text-green-600 font-bold p-4 bg-green-100 rounded-xl">Selesai</div>
          )}
          {order.status === "CANCELLED" && (
             <div className="text-center text-red-600 font-bold p-4 bg-red-100 rounded-xl">Dibatalkan</div>
          )}
        </div>
      </div>
    </motion.div>
  );

  const OrderColumn = ({ title, icon: Icon, count, orders, color }: any) => (
    <div className="flex-1 min-w-[300px]">
      <div className={`rounded-xl p-4 mb-4 ${color}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon size={20} />
            <h2 className="font-bold text-lg">{title}</h2>
          </div>
          <span className="bg-white bg-opacity-80 px-3 py-1 rounded-full text-sm font-bold">{count}</span>
        </div>
      </div>
      <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto pr-2 scrollbar-thin">
        {orders.length === 0 ? (
          <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-400 text-sm">Kosong</div>
        ) : (
          orders.map((order: Order) => (
            <div key={order.id} className="bg-white p-4 rounded-xl shadow border hover:shadow-md cursor-pointer" onClick={() => { setSelectedOrder(order); setShowDetailModal(true); }}>
               <div className="flex justify-between mb-2">
                 <span className="font-bold text-sm">#{order.id} - {order.customerName}</span>
                 <span className="text-xs text-gray-500">{formatTime(order.createdAt)}</span>
               </div>
               <div className="text-xs text-gray-600 mb-2">Meja {order.tableNumber} • {order.items.length} Items</div>
               <div className="flex gap-2">
                 {order.status === 'PENDING' && (
                    <button onClick={(e) => { e.stopPropagation(); handleUpdateStatus(order.id, "PREPARING"); }} className="flex-1 bg-blue-600 text-white text-xs py-2 rounded">Proses</button>
                 )}
                 {order.status === 'PREPARING' && (
                    <button onClick={(e) => { e.stopPropagation(); handleUpdateStatus(order.id, "DONE"); }} className="flex-1 bg-green-600 text-white text-xs py-2 rounded">Selesai</button>
                 )}
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;

  const showSingleColumn = activeFilter !== "ALL" || searchQuery !== "";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manajemen Pesanan</h1>
          <p className="text-gray-600">Real-time monitoring</p>
        </div>
        <button onClick={() => fetchOrders()} className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-semibold">
          Refresh Data
        </button>
      </div>

      {newOrderAlert && (
        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          Status pesanan berhasil diperbarui!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {filterTabs.map((tab) => (
           <button
             key={tab.id}
             onClick={() => setActiveFilter(tab.id)}
             className={`p-4 rounded-xl text-left border-2 transition-all ${activeFilter === tab.id ? `${tab.bgColor} ${tab.borderColor} shadow-md` : 'bg-white border-gray-200'}`}
           >
             <div className="flex justify-between items-center mb-2">
               <tab.icon className={tab.color} />
               <span className="text-2xl font-bold">{getTabCount(tab.id)}</span>
             </div>
             <div className={`font-semibold ${tab.color}`}>{tab.label}</div>
           </button>
        ))}
      </div>

      {showSingleColumn ? (
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-10 text-gray-500">Tidak ada pesanan ditemukan.</div>
          ) : (
            filteredOrders.map(order => <WideOrderCard key={order.id} order={order} />)
          )}
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4">
          <OrderColumn title="Menunggu" icon={Clock} count={pendingOrders.length} orders={pendingOrders} color="bg-yellow-100 text-yellow-700" />
          <OrderColumn title="Diproses" icon={UtensilsCrossed} count={preparingOrders.length} orders={preparingOrders} color="bg-blue-100 text-blue-700" />
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Detail Pesanan #{selectedOrder.id}</h2>
              <button onClick={() => setShowDetailModal(false)}><X /></button>
            </div>
            
            <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between mb-2"><span>Pelanggan:</span> <strong>{selectedOrder.customerName}</strong></div>
                    <div className="flex justify-between mb-2"><span>Meja:</span> <strong>{selectedOrder.tableNumber}</strong></div>
                    <div className="flex justify-between"><span>Pembayaran:</span> <strong>{selectedOrder.paymentMethod}</strong></div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 text-left">Menu</th>
                                <th className="p-3 text-center">Qty</th>
                                <th className="p-3 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedOrder.items.map((item, i) => (
                                <tr key={i} className="border-t">
                                    <td className="p-3">
                                        <div className="font-medium">{item.name}</div>
                                        {item.note && <div className="text-xs text-gray-500 italic">"{item.note}"</div>}
                                    </td>
                                    <td className="p-3 text-center">{item.qty}</td>
                                    <td className="p-3 text-right">Rp {(item.price * item.qty).toLocaleString('id-ID')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between items-center text-lg font-bold pt-2">
                    <span>Total:</span>
                    <span className="text-blue-600">Rp {selectedOrder.totalPrice.toLocaleString('id-ID')}</span>
                </div>

                <div className="flex gap-2 pt-4">
                    {selectedOrder.status === 'PENDING' && (
                        <>
                            <button onClick={() => { handleUpdateStatus(selectedOrder.id, "PREPARING"); setShowDetailModal(false); }} className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold">Terima & Proses</button>
                            <button onClick={() => { handleUpdateStatus(selectedOrder.id, "CANCELLED"); setShowDetailModal(false); }} className="flex-1 bg-red-100 text-red-600 py-3 rounded-lg font-bold">Tolak</button>
                        </>
                    )}
                    {selectedOrder.status === 'PREPARING' && (
                        <button onClick={() => { handleUpdateStatus(selectedOrder.id, "DONE"); setShowDetailModal(false); }} className="w-full bg-green-600 text-white py-3 rounded-lg font-bold">Selesai</button>
                    )}
                </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}