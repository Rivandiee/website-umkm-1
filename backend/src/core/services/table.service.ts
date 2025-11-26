// backend/src/core/services/table.service.ts

import prisma from "../../config/prisma";
import crypto from "crypto";

export class TableService {
  static async getAllTables() {
    return await prisma.table.findMany({
      orderBy: { number: 'asc' }
    });
  }

  static async createTable(data: {
    number: number;
    location: string;
    capacity: number;
  }) {
    // Cek duplikasi nomor meja
    const existing = await prisma.table.findUnique({ where: { number: data.number }});
    if(existing) throw new Error("Nomor meja sudah ada");

    const qrCodeUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/customer/menu?table=${data.number}`;

    return await prisma.table.create({
      data: {
        ...data,
        qrCode: qrCodeUrl,
        isOccupied: false
      }
    });
  }

  // [TAMBAHAN BARU] Fungsi Update
  static async updateTable(id: number, data: { number?: number; location?: string; capacity?: number }) {
    // Jika user ingin mengubah nomor meja, cek apakah nomor baru sudah dipakai meja lain
    if (data.number) {
      const existing = await prisma.table.findFirst({
        where: {
          number: data.number,
          NOT: { id: id } // Kecuali meja ini sendiri
        }
      });
      if (existing) throw new Error("Nomor meja sudah digunakan oleh meja lain");
    }

    // Update QR Code jika nomor meja berubah
    let updateData: any = { ...data };
    if (data.number) {
      updateData.qrCode = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/customer/menu?table=${data.number}`;
    }

    return await prisma.table.update({
      where: { id },
      data: updateData
    });
  }

  static async deleteTable(id: number) {
    // Cek apakah meja sedang ada order aktif (Opsional, untuk keamanan)
    // const activeOrder = await prisma.order.findFirst({ where: { tableId: id, status: { not: 'DONE' } } });
    // if (activeOrder) throw new Error("Tidak dapat menghapus meja yang sedang memiliki pesanan aktif");

    return await prisma.table.delete({
      where: { id }
    });
  }

  static async startSession(tableNumber: number) {
    const table = await prisma.table.findUnique({
      where: { number: tableNumber },
    });

    if (!table) {
      throw new Error("Table not found");
    }

    const sessionId = crypto.randomUUID();

    const session = await prisma.tableSession.create({
      data: {
        sessionId: sessionId,
        tableId: table.id,
      },
    });

    return {
      sessionId: session.sessionId,
      tableNumber: table.number,
      createdAt: session.createdAt
    };
  }
}