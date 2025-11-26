import { Request, Response } from "express";
import { MenuService } from "../../core/services/menu.service";
import fs from "fs";
import path from "path";

// Helper function untuk menghapus file fisik
const deleteFile = (filePath: string) => {
  try {
    // filePath dari database formatnya: "/uploads/nama-file.jpg"
    // Kita perlu path absolut di sistem
    const filename = path.basename(filePath); // Ambil nama file saja
    const absolutePath = path.join(__dirname, "../../../uploads", filename);

    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
      console.log(`File deleted: ${absolutePath}`);
    }
  } catch (error) {
    console.error("Failed to delete file:", error);
  }
};

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

export const deleteMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // 1. Hapus data dari database (return data yang dihapus)
    const deletedMenu = await MenuService.deleteMenu(Number(id));

    // 2. Jika ada gambar, hapus file fisiknya
    if (deletedMenu && deletedMenu.image) {
      deleteFile(deletedMenu.image);
    }

    return (res as any).success(null, "Menu deleted");
  } catch (error) {
    console.error(error);
    return (res as any).error("Failed to delete menu");
  }
};

export const updateMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const newImage = req.file ? `/uploads/${req.file.filename}` : undefined;
    
    // 1. Jika ada upload gambar baru, hapus gambar lama
    if (newImage) {
      const oldMenu = await MenuService.getMenuById(Number(id));
      if (oldMenu && oldMenu.image) {
        deleteFile(oldMenu.image);
      }
    }

    const updateData = {
      ...req.body,
      price: req.body.price ? Number(req.body.price) : undefined,
      categoryId: req.body.categoryId ? Number(req.body.categoryId) : undefined,
    };
    
    if (newImage) updateData.image = newImage;

    const menu = await MenuService.updateMenu(Number(id), updateData);
    return (res as any).success(menu, "Menu updated");
  } catch (error) {
    console.error(error);
    return (res as any).error("Failed to update menu");
  }
};