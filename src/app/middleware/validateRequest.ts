// import { NextFunction, Request, Response } from "express";
// import { AnyZodObject } from "zod";

// const validateRequest = (schema: AnyZodObject) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await schema.parseAsync({ body: req.body });
//       next();
//     } catch (error) {
//       next(error);
//     }
//   };
// };

// export default validateRequest;
import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import catchAsync from "../utils/catchAsync";
// import catchAsync from '../utils/catchAsync';

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });

    next();
  });
};

export default validateRequest;
