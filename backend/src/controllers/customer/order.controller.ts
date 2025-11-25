import { Request, Response } from "express";
import { OrderService } from "../../core/services/order.service";

export const createOrder = async (req: Request, res: Response) => {
  try {
    // 1. Buat pesanan di database menggunakan service
    const order = await OrderService.createOrder(req.body);

    // 2. --- SOCKET.IO EMIT START ---
    // Ambil instance Socket.io yang sudah disimpan di app (lihat index.ts)
    const io = req.app.get("io");

    // Emit event 'new-order' ke semua client yang terhubung (terutama Admin Dashboard)
    // Admin Dashboard akan mendengarkan event ini untuk menampilkan notifikasi/bunyi
    io.emit("new-order", {
      message: "Pesanan baru masuk!",
      data: order
    });
    // --- SOCKET.IO EMIT END ---

    return res.status(201).json({ 
      data: order, 
      message: "Order placed successfully" 
    });

  } catch (error: any) {
    console.error("Error creating order:", error);
    return res.status(500).json({ 
      error: error.message || "Failed to place order" 
    });
  }
};

export const getOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    
    // Ambil detail order berdasarkan ID
    const order = await OrderService.getOrderById(Number(orderId));
    
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.status(200).json({ data: order });

  } catch (error) {
    console.error("Error fetching order status:", error);
    return res.status(500).json({ error: "Error fetching status" });
  }
};