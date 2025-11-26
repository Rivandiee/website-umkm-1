import prisma from "../../config/prisma";
import crypto from "crypto"; // Import crypto untuk generate UUID

export class TableService {
  // Mendapatkan semua meja
  static async getAllTables() {
    return await prisma.table.findMany({
      orderBy: { number: 'asc' }
    });
  }

  // Membuat meja baru (Admin)
  static async createTable(data: {
    number: number;
    location: string;
    capacity: number;
  }) {
    const qrCodeUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/customer/menu?table=${data.number}`;

    return await prisma.table.create({
      data: {
        ...data,
        qrCode: qrCodeUrl,
        isOccupied: false
      }
    });
  }

  // Menghapus meja (Admin)
  static async deleteTable(id: number) {
    return await prisma.table.delete({
      where: { id }
    });
  }

  // === METODE BARU UNTUK SESI PELANGGAN ===
  // Dipanggil saat pelanggan scan QR Code
  static async startSession(tableNumber: number) {
    // 1. Cari meja berdasarkan nomor
    const table = await prisma.table.findUnique({
      where: { number: tableNumber },
    });

    if (!table) {
      throw new Error("Table not found");
    }

    // 2. Buat Session ID unik (UUID)
    const sessionId = crypto.randomUUID();

    // 3. Simpan sesi ke database
    // Opsional: Hapus sesi lama yang mungkin masih menggantung di meja ini agar bersih
    // await prisma.tableSession.deleteMany({ where: { tableId: table.id } });

    const session = await prisma.tableSession.create({
      data: {
        sessionId: sessionId,
        tableId: table.id,
      },
    });

    // Kembalikan data sesi yang diperlukan frontend
    return {
      sessionId: session.sessionId,
      tableNumber: table.number,
      createdAt: session.createdAt
    };
  }
}