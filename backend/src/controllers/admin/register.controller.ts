import { Request, Response } from "express";
import { RegisterService } from "../../core/services/register.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, name } = req.body;

    // Validasi input
    if (!username || !password || !name) {
      return res.status(400).json({
        message: "Username, password, and name are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // Panggil service
    const result = await RegisterService.registerAdmin({
      username,
      name,
      password,
    });

    return res.status(201).json({
      message: "Admin registered successfully",
      data: result,
    });
  } catch (error: any) {
    // Error jika username sudah digunakan
    if (error.message === "Username already exists") {
      return res.status(409).json({ message: error.message });
    }

    return res.status(500).json({
      message: error.message || "Registration failed",
    });
  }
};

// ========================
// GET ALL ADMINS
// ========================

export const getAllAdmins = async (req: Request, res: Response) => {
  try {
    const admins = await RegisterService.getAllAdmins();

    return res.status(200).json({
      message: "Fetched all admins successfully",
      data: admins,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Failed to fetch admins",
    });
  }
};
