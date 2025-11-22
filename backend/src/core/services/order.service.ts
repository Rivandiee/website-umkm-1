import prisma from "../../config/prisma";
import { OrderStatus, PaymentMethod, PaymentStatus } from "@prisma/client";

interface OrderItemInput {
  id: number; // Menu ID
  qty: number;
  price: number;
  note?: string;
}

export class OrderService {
  static async createOrder(data: {
    customerName: string;
    tableNumber: number;
    items: OrderItemInput[];
    paymentMethod: string;
    totalPrice: number;
  }) {
    // 1. Validasi Meja
    const table = await prisma.table.findUnique({
      where: { number: data.tableNumber }
    });

    if (!table) throw new Error("Table not found");

    // 2. Gunakan Transaksi Database
    return await prisma.$transaction(async (tx) => {
      // Buat Order Header
      const newOrder = await tx.order.create({
        data: {
          customerName: data.customerName,
          tableId: table.id,
          totalPrice: data.totalPrice,
          paymentMethod: data.paymentMethod === "qris" ? PaymentMethod.NONCASH : PaymentMethod.CASH,
          status: OrderStatus.PENDING,
          paymentStatus: PaymentStatus.UNPAID
        }
      });

      // Buat Order Items
      const orderItemsData = data.items.map(item => ({
        orderId: newOrder.id,
        menuId: item.id,
        qty: item.qty,
        price: item.price,
        note: item.note || ""
      }));

      await tx.orderItem.createMany({
        data: orderItemsData
      });

      return newOrder;
    });
  }

  static async getOrderById(id: number) {
    return await prisma.order.findUnique({
      where: { id },
      include: {
        items: { include: { menu: true } },
        table: true
      }
    });
  }

  static async getOrders(statusFilter?: string) {
    const whereClause = statusFilter && statusFilter !== "ALL"
      ? { status: statusFilter as OrderStatus }
      : {};

    return await prisma.order.findMany({
      where: whereClause,
      include: {
        items: { include: { menu: true } },
        table: true
      },
      orderBy: { createdAt: "desc" }
    });
  }

  static async updateStatus(id: number, status: OrderStatus) {
    return await prisma.order.update({
      where: { id },
      data: { status },
    });
  }
}