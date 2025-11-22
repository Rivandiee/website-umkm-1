import { Request, Response } from "express";
import { OrderService } from "../../core/services/order.service";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = await OrderService.createOrder(req.body);
    return res.status(201).json({ data: order, message: "Order placed successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Failed to place order" });
  }
};

export const getOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const order = await OrderService.getOrderById(Number(orderId));
    if (!order) return res.status(404).json({ error: "Order not found" });
    return res.status(200).json({ data: order });
  } catch (error) {
    return res.status(500).json({ error: "Error fetching status" });
  }
};