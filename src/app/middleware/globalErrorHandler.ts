import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const success = false;
  const message = err.message || "Something Went Wrong!";
  return res.status(statusCode).json({
    success,
    message,
    error: err,
  });
};
