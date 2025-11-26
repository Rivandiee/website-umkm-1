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
    sessionId: string; // Field baru untuk validasi keamanan
  }) {
    // 1. Validasi Sesi Meja (KEAMANAN BARU)
    // Pastikan sessionId dikirim dari frontend
    if (!data.sessionId) {
      throw new Error("Session ID is required (Please scan QR code again)");
    }

    // Cari sesi di database berdasarkan ID
    const session = await prisma.tableSession.findUnique({
      where: { sessionId: data.sessionId },
      include: { table: true }
    });

    // Cek validitas sesi
    if (!session) {
      throw new Error("Invalid or expired session");
    }

    // Validasi apakah sesi ini benar milik nomor meja yang dikirim
    // Mencegah user menggunakan sesi meja 1 untuk memesan di meja 5
    if (session.table.number !== data.tableNumber) {
      throw new Error("Session ID does not match the table number");
    }

    // Cek umur sesi (Validasi waktu)
    // Contoh: Sesi kadaluarsa setelah 4 jam
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

    // 3. Validasi Qty (Tidak boleh <= 0)
    const hasInvalidQty = data.items.some((item) => item.qty <= 0);
    if (hasInvalidQty) {
      throw new Error("Quantity item tidak boleh kurang dari 1");
    }

    // 4. Validasi Meja
    const table = await prisma.table.findUnique({
      where: { number: data.tableNumber },
    });

    if (!table) throw new Error("Table not found");

    // 5. Validasi Ketersediaan Menu & Harga (Mencegah manipulasi)
    const menuIds = data.items.map((item) => item.id);
    
    // Ambil data menu asli dari database
    const dbMenus = await prisma.menu.findMany({
      where: {
        id: { in: menuIds },
        isAvailable: true, // HANYA ambil menu yang tersedia
      },
    });

    // Cek apakah ada menu yang tidak ditemukan atau sedang tidak tersedia
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
        price: dbMenu.price, // Gunakan harga dari DB, bukan dari request user
        note: item.note || "",
      };
    });

    // 6. Gunakan Transaksi Database untuk membuat Order dan OrderItem
    return await prisma.$transaction(async (tx) => {
      // Buat Order Header
      const newOrder = await tx.order.create({
        data: {
          customerName: data.customerName,
          tableId: table.id,
          totalPrice: calculatedTotal, // Gunakan total hasil hitungan server
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