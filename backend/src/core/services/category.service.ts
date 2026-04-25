import prisma from "../../config/prisma";

export class CategoryService {
  static async getAllCategories() {
    return await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        _count: { select: { menus: true } }
      },
      orderBy: { name: "asc" }
    });
  }

  static async createCategory(data: { name: string; description?: string }) {
    return await prisma.category.create({ data });
  }

  static async updateCategory(id: number, data: { name?: string; description?: string }) {
    const exists = await prisma.category.findUnique({ where: { id } });
    if (!exists) throw new Error(`Category ${id} not found`);
    return await prisma.category.update({ where: { id }, data });
  }

  static async deleteCategory(id: number) {
    const exists = await prisma.category.findUnique({ where: { id } });
    if (!exists) throw new Error(`Category ${id} not found`);
    return await prisma.category.delete({ where: { id } });
  }
}