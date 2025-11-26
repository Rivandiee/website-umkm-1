import { Request, Response } from "express";
import { MenuService } from "../../core/services/menu.service";
import fs from "fs";
import path from "path";

// Helper function untuk menghapus file fisik
const deleteFile = (filePath: string) => {
  try {
    const filename = path.basename(filePath);
    const absolutePath = path.join(__dirname, "../../../uploads", filename);

    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
      console.log(`File deleted: ${absolutePath}`);
    }
  } catch (error) {
    console.error("Failed to delete file:", error);
  }
};

// Helper simple untuk membuat slug
const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Hapus karakter aneh
    .replace(/[\s_-]+/g, "-") // Ganti spasi dengan -
    .replace(/^-+|-+$/g, "") + "-" + Date.now(); // Tambah timestamp agar unik
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
    
    // Generate slug otomatis dari nama
    const slug = generateSlug(req.body.name);

    const menu = await MenuService.createMenu({
      ...req.body,
      price: Number(req.body.price),
      categoryId: Number(req.body.categoryId),
      slug: slug, // <--- TAMBAHKAN INI
      image
    });
    
    return (res as any).success(menu, "Menu created successfully");
  } catch (error: any) {
    console.error("Create Menu Error:", error); // Log error ke terminal agar terlihat detailnya
    return (res as any).error(error.message || "Failed to create menu");
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
    
    const deletedMenu = await MenuService.deleteMenu(Number(id));

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
    
    if (newImage) {
      const oldMenu = await MenuService.getMenuById(Number(id));
      if (oldMenu && oldMenu.image) {
        deleteFile(oldMenu.image);
      }
    }

    // Persiapkan data update
    const updateData: any = {
      price: req.body.price ? Number(req.body.price) : undefined,
      categoryId: req.body.categoryId ? Number(req.body.categoryId) : undefined,
      description: req.body.description,
      name: req.body.name
    };

    // Jika nama berubah, update slug juga (opsional, tapi disarankan)
    if (req.body.name) {
      updateData.slug = generateSlug(req.body.name);
    }
    
    if (newImage) updateData.image = newImage;

    // Hapus properti undefined agar tidak menimpa data lama dengan null/undefined
    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

    const menu = await MenuService.updateMenu(Number(id), updateData);
    return (res as any).success(menu, "Menu updated");
  } catch (error) {
    console.error(error);
    return (res as any).error("Failed to update menu");
  }
};