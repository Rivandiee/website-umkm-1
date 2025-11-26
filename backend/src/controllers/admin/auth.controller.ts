import { Request, Response } from "express";
import { AuthService } from "../../core/services/auth.service";

export const login = async (req: Request, res: Response) => {
  try {
    // Data di sini SUDAH PASTI ADA dan VALID sesuai schema
    const { username, password } = req.body; 

    const result = await AuthService.loginAdmin(username, password);
    
    return res.status(200).json({
      message: "Login successful",
      data: result,
    });

  } catch (error: any) {
    if (error.message === "Admin not found") {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === "Invalid password") {
      return res.status(401).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
};
