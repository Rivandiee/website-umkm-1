import prisma from "../../config/prisma";
import bcrypt from "bcrypt";

export class RegisterService {
  static async registerAdmin(data: { username: string; password: string; name: string }) {
    // 1. Cek apakah username sudah digunakan
    const existingAdmin = await prisma.admin.findUnique({
      where: { username: data.username }
    });

    if (existingAdmin) {
      throw new Error("Username already exists");
    }

    // 2. Enkripsi password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    // 3. Simpan admin baru ke database
    const newAdmin = await prisma.admin.create({
      data: {
        username: data.username,
        password: hashedPassword,
        name: data.name
      }
    });

    // 4. Kembalikan data (tanpa password)
    return {
      id: newAdmin.id,
      username: newAdmin.username,
      name: newAdmin.name,
      createdAt: newAdmin.createdAt
    };
  }
}