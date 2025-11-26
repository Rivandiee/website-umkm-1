import prisma from "../../config/prisma";
import bcrypt from "bcrypt";
import { Role } from "@prisma/client"; // Import Enum Role dari Prisma Client

export class RegisterService {
  static async registerAdmin(data: { username: string; password: string; name: string; role?: Role }) {
    
    // 1. Cek apakah username sudah ada
    const existingAdmin = await prisma.admin.findUnique({
      where: { username: data.username }
    });

    if (existingAdmin) {
      throw new Error("Username already exists");
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // 3. Buat admin baru
    const newAdmin = await prisma.admin.create({
      data: {
        username: data.username,
        password: hashedPassword,
        name: data.name,
        // Gunakan role yang dikirim, atau default ke CASHIER jika kosong
        role: data.role || Role.CASHIER 
      },
      // Pilih field yang ingin dikembalikan (exclude password)
      select: {
        id: true,
        username: true,
        name: true,
        role: true, // Sertakan role di response
        createdAt: true
      }
    });

    // 4. Ambil semua admin (tanpa password) untuk refresh list di frontend
    const allAdmins = await prisma.admin.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        role: true,
        createdAt: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    // 5. Kembalikan data
    return {
      message: "Admin registered successfully",
      newAdmin,
      allAdmins
    };
  }

  static async getAllAdmins() {
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        role: true, // Sertakan role saat mengambil list
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return admins;
  }
}