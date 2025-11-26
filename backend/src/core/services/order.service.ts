import prisma from "../../config/prisma";
import { OrderStatus, PaymentMethod, PaymentStatus } from "@prisma/client";
import { PaymentService } from "./payment.service"; 

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
    sessionId: string;
  }) {
    // 1. Validasi Sesi Meja (KEAMANAN)
    if (!data.sessionId) {
      throw new Error("Session ID is required (Please scan QR code again)");
    }

    const session = await prisma.tableSession.findUnique({
      where: { sessionId: data.sessionId },
      include: { table: true }
    });

    if (!session) {
      throw new Error("Invalid or expired session");
    }

    if (session.table.number !== data.tableNumber) {
      throw new Error("Session ID does not match the table number");
    }

    const MAX_SESSION_HOURS = 4;
    const now = new Date();
    const sessionAge = (now.getTime() - session.createdAt.getTime()) / (1000 * 60 * 60);
    
    if (sessionAge > MAX_SESSION_HOURS) {
      throw new Error("Session expired. Please scan QR code again.");
    }

    // 2. Validasi Item Pesanan
    if (!data.items || data.items.length === 0) {
      throw new Error("Order items cannot be empty");
    }

    // 3. Validasi Qty
    const hasInvalidQty = data.items.some((item) => item.qty <= 0);
    if (hasInvalidQty) {
      throw new Error("Quantity item tidak boleh kurang dari 1");
    }

    // 4. Validasi Meja
    const table = await prisma.table.findUnique({
      where: { number: data.tableNumber },
    });

    if (!table) throw new Error("Table not found");

    // 5. Validasi Ketersediaan Menu & Harga (Mencegah manipulasi harga dari frontend)
    const menuIds = data.items.map((item) => item.id);
    
    const dbMenus = await prisma.menu.findMany({
      where: {
        id: { in: menuIds },
        isAvailable: true,
      },
    });

    if (dbMenus.length !== new Set(menuIds).size) {
      const foundIds = dbMenus.map(m => m.id);
      const missingIds = menuIds.filter(id => !foundIds.includes(id));
      console.error(`Missing/Unavailable Menu IDs: ${missingIds.join(", ")}`);
      throw new Error("Beberapa menu tidak valid atau sedang tidak tersedia");
    }

    // Hitung ulang Total Price dari database (Server-side calculation)
    let calculatedTotal = 0;
    const orderItemsData = data.items.map((item) => {
      const dbMenu = dbMenus.find((m) => m.id === item.id);
      if (!dbMenu) throw new Error(`Menu ID ${item.id} not found`); 

      const itemTotal = dbMenu.price * item.qty;
      calculatedTotal += itemTotal;

      return {
        menuId: item.id,
        qty: item.qty,
        price: dbMenu.price, // Gunakan harga dari DB
        note: item.note || "",
      };
    });

    // 6. Gunakan Transaksi Database
    const result = await prisma.$transaction(async (tx) => {
      // Buat Order Header
      const newOrder = await tx.order.create({
        data: {
          customerName: data.customerName,
          tableId: table.id,
          totalPrice: calculatedTotal,
          paymentMethod:
            data.paymentMethod === "qris"
              ? PaymentMethod.NONCASH
              : PaymentMethod.CASH,
          status: OrderStatus.PENDING,
          paymentStatus: PaymentStatus.UNPAID,
        },
      });

      // Buat Order Items
      const itemsPayload = orderItemsData.map(item => ({
        ...item,
        orderId: newOrder.id
      }));

      await tx.orderItem.createMany({
        data: itemsPayload,
      });

      return newOrder;
    });

    // --- INTEGRASI MIDTRANS ---
    let snapToken = null;
    
    if (data.paymentMethod === "qris") {
      // Ambil order lengkap dengan relasi menu untuk dikirim ke Midtrans (item_details)
      const fullOrder = await prisma.order.findUnique({
        where: { id: result.id },
        include: { items: { include: { menu: true } } }
      });

      if (fullOrder) {
        // Panggil PaymentService untuk generate token
        snapToken = await PaymentService.createTransactionToken(fullOrder);
      }
    }

    // Kembalikan data order beserta snapToken (jika ada)
    return { ...result, snapToken };
  }

  static async getOrderById(id: number) {
    return await prisma.order.findUnique({
      where: { id },
      include: {
        items: { include: { menu: true } },
        table: true,
      },
    });
  }

  static async getOrders(statusFilter?: string) {
    const whereClause =
      statusFilter && statusFilter !== "ALL"
        ? { status: statusFilter as OrderStatus }
        : {};

    return await prisma.order.findMany({
      where: whereClause,
      include: {
        items: { include: { menu: true } },
        table: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  static async updateStatus(id: number, status: OrderStatus) {
    return await prisma.order.update({
      where: { id },
      data: { status },
    });
  }
}