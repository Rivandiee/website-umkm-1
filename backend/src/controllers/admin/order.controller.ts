import { Request, Response } from "express";
import { OrderService } from "../../core/services/order.service";

export const getOrders = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    const orders = await OrderService.getOrders(status as string);
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch orders" });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // Update status di database terlebih dahulu
    const order = await OrderService.updateStatus(Number(id), status);

    // --- SOCKET.IO EMIT START ---
    // Ambil instance 'io' yang sudah di-set di index.ts
    const io = req.app.get("io");
    
    // 1. Emit global (Opsional)
    // Berguna jika Anda punya dashboard monitoring di dapur atau kasir
    // yang perlu tahu setiap ada perubahan status pesanan apapun.
    io.emit("order-status-updated", order);

    // 2. Emit spesifik ke Room ID order tersebut
    // Ini agar notifikasi hanya diterima oleh Customer yang memiliki order ID ini.
    // (Pastikan di frontend customer melakukan: socket.emit('join-order', orderId))
    io.to(`order-${id}`).emit("order-status-updated", order);
    // --- SOCKET.IO EMIT END ---

    return res.status(200).json({ data: order, message: "Order status updated" });
  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({ message: "Failed to update order status" });
  }
};