import { Request, Response } from "express";
import prisma from "../../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Cari admin (Untuk pertama kali, kamu mungkin perlu seed manual admin di database)
    const admin = await prisma.admin.findUnique({ where: { username } });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      message: "Login successful",
      data: { token, admin: { name: admin.name, username: admin.username } },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};