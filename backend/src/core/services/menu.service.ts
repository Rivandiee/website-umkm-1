import prisma from "../../config/prisma";

export class MenuService {
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

  static async getAdminMenus() {
    return await prisma.menu.findMany({
      include: { category: true },
      orderBy: { updatedAt: 'desc' }
    });
  }

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

  static async updateStatus(id: number, isAvailable: boolean) {
    return await prisma.menu.update({
      where: { id },
      data: { isAvailable },
    });
  }
}