import prisma from "../../config/prisma";

export class MenuService {
  // Mendapatkan semua menu (untuk customer - hanya yang available)
  static async getAllMenus(categoryName?: string) {
    const whereClause: any = { isAvailable: true };
    
    if (categoryName && categoryName !== "All") {
      whereClause.category = { name: categoryName };
    }

    return await prisma.menu.findMany({
      where: whereClause,
      include: { category: true },
      orderBy: { updatedAt: 'desc' }
    });
  }

  // Mendapatkan semua menu (untuk admin - termasuk yang tidak available)
  static async getAdminMenus() {
    return await prisma.menu.findMany({
      include: { category: true },
      orderBy: { updatedAt: 'desc' }
    });
  }

  // [TAMBAHAN BARU] Mendapatkan satu menu berdasarkan ID
  // Digunakan oleh controller untuk mengecek gambar lama sebelum update/delete
  static async getMenuById(id: number) {
    return await prisma.menu.findUnique({
      where: { id },
      include: { category: true } // Opsional: sertakan kategori jika perlu
    });
  }

  // Membuat menu baru
  static async createMenu(data: {
    name: string;
    price: number;
    description?: string;
    categoryId: number;
    slug: string;
    image?: string | null;
  }) {
    return await prisma.menu.create({
      data: {
        ...data,
        isAvailable: true
      },
    });
  }

  // Mengupdate status ketersediaan menu
  static async updateStatus(id: number, isAvailable: boolean) {
    return await prisma.menu.update({
      where: { id },
      data: { isAvailable },
    });
  }

  // Menghapus menu
  static async deleteMenu(id: number) {
    return await prisma.menu.delete({
      where: { id }
    });
  }

  // Mengupdate detail menu
  static async updateMenu(id: number, data: any) {
    return await prisma.menu.update({
      where: { id },
      data
    });
  }
}