import prisma from "../../config/prisma";

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
    const qrCodeUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/customer/menu?table=${data.number}`;

    return await prisma.table.create({
      data: {
        ...data,
        qrCode: qrCodeUrl,
        isOccupied: false
      }
    });
  }
}