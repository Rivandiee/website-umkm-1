import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Interface payload token
interface UserPayload {
  id: number;
  username: string;
  role: string; // Pastikan role ada
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

// Middleware Cek Token (Login atau tidak)
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access Denied: No Token Provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as UserPayload;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid Token" });
  }
};

// Middleware Cek Role (Punya hak akses atau tidak)
export const verifyRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: "Forbidden: Anda tidak memiliki izin untuk mengakses fitur ini" 
      });
    }

    next();
  };
};