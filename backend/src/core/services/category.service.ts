import prisma from "../../config/prisma";

export class CategoryService {
  static async getAllCategories() {
    return await prisma.category.findMany({
      include: {
        _count: {
          select: { menus: true }
        }
      }
    });
  }

  static async createCategory(data: { name: string; description?: string }) {
    return await prisma.category.create({
      data
    });
  }

  static async updateCategory(id: number, data: { name?: string; description?: string }) {
    return await prisma.category.update({
      where: { id },
      data
    });
  }

  static async deleteCategory(id: number) {
    return await prisma.category.delete({
      where: { id }
    });
  }
}