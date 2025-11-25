import { Request, Response } from "express";
import { CategoryService } from "../../core/services/category.service";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryService.getAllCategories();
    return (res as any).success(categories);
  } catch (error) {
    return (res as any).error("Failed to fetch categories");
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await CategoryService.createCategory(req.body);
    return (res as any).success(category, "Category created");
  } catch (error) {
    return (res as any).error("Failed to create category");
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await CategoryService.updateCategory(Number(id), req.body);
    return (res as any).success(category, "Category updated");
  } catch (error) {
    return (res as any).error("Failed to update category");
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await CategoryService.deleteCategory(Number(id));
    return (res as any).success(null, "Category deleted");
  } catch (error) {
    return (res as any).error("Failed to delete category");
  }
};