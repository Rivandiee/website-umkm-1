import { Request, Response } from "express";
import { RegisterService } from "../../core/services/register.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, name } = req.body;

    // Validasi Input Sederhana
    if (!username || !password || !name) {
      return res.status(400).json({ message: "Username, password, and name are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Panggil Service Register
    const result = await RegisterService.registerAdmin({ 
      username, 
      password, 
      name 
    });

    return res.status(201).json({ data: result, message: "Admin registered successfully" });
  } catch (error: any) {
    // Menangani error spesifik jika username sudah ada
    if (error.message === "Username already exists") {
      return res.status(409).json({ message: error.message }); // 409 Conflict
    }
    return res.status(500).json({ message: error.message || "Registration failed" });
  }
};