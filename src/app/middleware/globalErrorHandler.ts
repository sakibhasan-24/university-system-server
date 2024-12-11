import { NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorSources } from "../interface/error";
import config from "../config";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let success = false;
  let message = err.message || "Something Went Wrong!";
  const handleZodError = (err: ZodError) => {
    let errorSources = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      };
    });
    return {
      statusCode,
      message: "Zod Validation Error",
      errorSources,
    };
  };
  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Something Went Wrong",
    },
  ];
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError?.errorSources;
  }
  return res.status(statusCode).json({
    success,
    message,
    errorSources,
    stack: config.NODE_ENV === "developments" && err?.stack,
  });
};
