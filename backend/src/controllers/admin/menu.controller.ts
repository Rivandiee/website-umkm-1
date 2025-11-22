import { Request, Response } from "express";
import { MenuService } from "../../core/services/menu.service";

export const getMenus = async (req: Request, res: Response) => {
  try {
    const menus = await MenuService.getAdminMenus();
    return (res as any).success(menus);
  } catch (error) {
    return (res as any).error("Failed to fetch menus");
  }
};

export const createMenu = async (req: Request, res: Response) => {
  try {
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const menu = await MenuService.createMenu({
      ...req.body,
      price: Number(req.body.price),
      categoryId: Number(req.body.categoryId),
      image
    });
    return (res as any).success(menu, "Menu created successfully");
  } catch (error) {
    return (res as any).error("Failed to create menu");
  }
};

export const updateMenuStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isAvailable } = req.body;
    const menu = await MenuService.updateStatus(Number(id), isAvailable);
    return (res as any).success(menu, "Menu status updated");
  } catch (error) {
    return (res as any).error("Failed to update menu");
  }
};