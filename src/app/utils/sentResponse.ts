import { Response } from "express";

const sentResponse = <T>(
  res: Response,
  data: {
    success: boolean;
    statusCode: number;
    message?: string;
    data: T;
  }
) => {
  res.status(data?.statusCode).json({
    success: data?.success,
    message: data?.message,
    data: data?.data,
  });
};

export default sentResponse;
