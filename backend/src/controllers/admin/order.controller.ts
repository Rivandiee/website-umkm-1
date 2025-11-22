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
    const order = await OrderService.updateStatus(Number(id), status);
    return res.status(200).json({ data: order, message: "Order status updated" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update order status" });
  }
};