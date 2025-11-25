import prisma from "../../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  static async loginAdmin(username: string, password: string) {
    const admin = await prisma.admin.findUnique({ where: { username } });
    if (!admin) throw new Error("Admin not found");

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) throw new Error("Invalid password");

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    return {
      token,
      admin: { name: admin.name, username: admin.username }
    };
  }
}
