export interface SuccessResponse<T = any> {
  success: true;
  message: string;
  data: T;
}

export interface ErrorResponse {
  success: false;
  message: string;
  code: number;
}

export const successResponse = <T>(
  data: T,
  message = "Success"
): SuccessResponse<T> => {
  return {
    success: true,
    message,
    data,
  };
};

export const errorResponse = (
  message = "Error",
  code = 500
): ErrorResponse => {
  return {
    success: false,
    message,
    code,
  };
};
