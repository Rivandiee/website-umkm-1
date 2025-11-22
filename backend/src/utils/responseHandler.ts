import { Request, Response, NextFunction } from "express";
import { successResponse, errorResponse } from "./responseFormat";

declare global {
  namespace Express {
    interface Response {
      success: <T = any>(data: T, message?: string) => Response;
      error: (message: string, status?: number) => Response;
    }
  }
}

export const responseHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Success Response
  res.success = function <T>(data: T, message = "Success"): Response {
    const json = successResponse<T>(data, message);
    return res.status(200).json(json);
  };

  // Error Response
  res.error = function (message = "Error", status = 500): Response {
    const json = errorResponse(message, status);
    return res.status(status).json(json);
  };

  next();
};
