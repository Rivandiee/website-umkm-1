import { Request, Response } from "express";
import { AuthService } from "../../core/services/auth.service";

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const result = await AuthService.loginAdmin(username, password);
    return res.success(result, "Login successful");
  } catch (error: any) {
    return res.error(error.message, 401);
  }
};