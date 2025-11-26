// backend/src/middlewares/validateMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodError } from "zod";

export const validate = (schema: ZodObject<any>) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Parse request body/query/params dengan skema Zod
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Format error agar mudah dibaca frontend
        const errorMessages = error.issues.map((err) => ({
          field: err.path[1], // Mengambil nama field (contoh: 'username')
          message: err.message,
        }));
        
        return res.status(400).json({
          success: false,
          message: "Validation Error",
          errors: errorMessages,
        });
      }
      next(error);
    }
  };