import { Request, Response } from "express";
import { TableService } from "../../core/services/table.service";

export const startSession = async (req: Request, res: Response) => {
  try {
    const { tableNumber } = req.body;

    if (!tableNumber) {
      return (res as any).error("Table number is required", 400);
    }

    const session = await TableService.startSession(Number(tableNumber));
    
    return (res as any).success(session, "Session started successfully");
  } catch (error: any) {
    return (res as any).error(error.message || "Failed to start session");
  }
};