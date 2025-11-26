// backend/src/schemas/auth.schema.ts
import { z } from "zod";

export const loginSchema = z.object({
  body: z.object({
    username: z.string().min(1, "Username wajib diisi"),
    password: z.string().min(1, "Password wajib diisi"),
  }),
});

export const registerSchema = z.object({
  body: z.object({
    username: z.string().min(3, "Username minimal 3 karakter"),
    password: z.string().min(6, "Password minimal 6 karakter"),
    name: z.string().min(1, "Nama wajib diisi"),
    role: z.enum(["SUPER_ADMIN", "CASHIER"]).optional(), // Opsional, default CASHIER
  }),
});