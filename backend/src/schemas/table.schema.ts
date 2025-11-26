// backend/src/schemas/table.schema.ts
import { z } from "zod";

export const createTableSchema = z.object({
  body: z.object({
    number: z.number({ message: "Nomor meja wajib diisi" }).int().positive(),
    location: z.string({ message: "Lokasi wajib diisi" }).min(1),
    capacity: z.number({ message: "Kapasitas wajib diisi" }).int().positive(),
  }),
});

export const updateTableSchema = z.object({
  params: z.object({
    id: z.string().transform((val) => parseInt(val, 10)), // Konversi params string ke number
  }),
  body: z.object({
    number: z.number().int().positive().optional(),
    location: z.string().min(1).optional(),
    capacity: z.number().int().positive().optional(),
  }),
});