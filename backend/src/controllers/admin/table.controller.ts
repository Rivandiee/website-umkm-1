import { Request, Response } from "express";
import { TableService } from "../../core/services/table.service";

export const getTables = async (req: Request, res: Response) => {
  try {
    const tables = await TableService.getAllTables();
    return res.status(200).json({ data: tables });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch tables" });
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
    return res.status(201).json({ data: table, message: "Table created" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create table" });
  }
};