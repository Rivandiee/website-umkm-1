import { Request, Response } from "express";
import { MenuService } from "../../core/services/menu.service";

export const getPublicMenus = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    const menus = await MenuService.getAllMenus(category as string);
    return res.status(200).json(menus);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch menus" });
  }
};