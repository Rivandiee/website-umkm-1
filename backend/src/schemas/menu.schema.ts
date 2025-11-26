// backend/src/schemas/menu.schema.ts
import { z } from "zod";

export const createMenuSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    // Transform string ke number karena FormData mengirim string
    price: z.string().transform((val) => parseInt(val, 10)).or(z.number()), 
    categoryId: z.string().transform((val) => parseInt(val, 10)).or(z.number()),
  }),
});