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
    // 1. Validasi Input Dasar
    if (!data.items || data.items.length === 0) {
      throw new Error("Order items cannot be empty");
    }

    // 2. Validasi Qty (Tidak boleh <= 0)
    const hasInvalidQty = data.items.some((item) => item.qty <= 0);
    if (hasInvalidQty) {
      throw new Error("Quantity item tidak boleh kurang dari 1");
    }

    // 3. Validasi Meja
    const table = await prisma.table.findUnique({
      where: { number: data.tableNumber },
    });

    if (!table) throw new Error("Table not found");

    // 4. Validasi Ketersediaan Menu & Harga (Mencegah manipulasi)
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
      // Kita bisa mencari tahu item mana yang hilang untuk pesan error lebih detail
      const foundIds = dbMenus.map(m => m.id);
      const missingIds = menuIds.filter(id => !foundIds.includes(id));
      console.error(`Missing/Unavailable Menu IDs: ${missingIds.join(", ")}`);
      throw new Error("Beberapa menu tidak valid atau sedang tidak tersedia");
    }

    // (Opsional tapi Disarankan) Hitung ulang Total Price dari database
    // Jangan percaya total yang dikirim dari frontend
    let calculatedTotal = 0;
    const orderItemsData = data.items.map((item) => {
      const dbMenu = dbMenus.find((m) => m.id === item.id);
      if (!dbMenu) throw new Error(`Menu ID ${item.id} not found`); // Should be caught above

      const itemTotal = dbMenu.price * item.qty;
      calculatedTotal += itemTotal;

      return {
        // orderId akan diisi otomatis oleh connect/nested create nanti, 
        // atau manual ID di bawah jika pakai tx terpisah.
        // Di sini kita siapkan objek datanya saja.
        menuId: item.id,
        qty: item.qty,
        price: dbMenu.price, // Gunakan harga dari DB, bukan dari request user
        note: item.note || "",
      };
    });

    // 5. Gunakan Transaksi Database
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
      // Kita perlu map ulang orderItemsData untuk menyertakan orderId yang baru dibuat
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