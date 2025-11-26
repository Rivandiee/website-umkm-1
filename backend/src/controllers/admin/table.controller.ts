// backend/src/controllers/admin/table.controller.ts

import { Request, Response } from "express";
import { TableService } from "../../core/services/table.service";

export const getTables = async (req: Request, res: Response) => {
  try {
    const tables = await TableService.getAllTables();
    return (res as any).success(tables); // Menggunakan responseHandler custom Anda
  } catch (error) {
    return (res as any).error("Failed to fetch tables");
  }
};

export const createTable = async (req: Request, res: Response) => {
  try {
    const { number, location, capacity } = req.body;
    const table = await TableService.createTable({
      number: Number(number),
      location,
      capacity: Number(capacity)
    });
    return (res as any).success(table, "Table created successfully");
  } catch (error: any) {
    return (res as any).error(error.message || "Failed to create table", 400);
  }
};

// [TAMBAHAN BARU] Update Controller
export const updateTable = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { number, location, capacity } = req.body;

    const table = await TableService.updateTable(Number(id), {
      number: number ? Number(number) : undefined,
      location,
      capacity: capacity ? Number(capacity) : undefined
    });

    return (res as any).success(table, "Table updated successfully");
  } catch (error: any) {
    return (res as any).error(error.message || "Failed to update table", 400);
  }
};

export const deleteTable = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await TableService.deleteTable(Number(id));
    return (res as any).success(null, "Table deleted successfully");
  } catch (error: any) {
    return (res as any).error(error.message || "Failed to delete table", 400);
  }
};