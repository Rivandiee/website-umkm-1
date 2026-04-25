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