import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import sentResponse from "../../utils/sentResponse";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";

//without catchAsync Way
// const createStudent = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { password, student: studentData } = req.body;
//   // console.log(studentData);
//   //   console.log(req.body);
//   try {
//     const result = await userService.createStudentInDb(password, studentData);
//     // res.status(201).json({
//     //   success: true,
//     //   message: "STUDENT CREATED SUCCESSFULLY",
//     //   data: result,
//     // });
//     sentResponse(res, {
//       success: true,
//       statusCode: status.OK,
//       message: "STUDENT CREATED SUCCESSFULLY",
//       data: result,
//     });
//   } catch (error) {
//     console.log(error);
//     // res.status(500).json({
//     //   success: false,
//     //   message: error.message || "Something Went Wrong!",
//     //   error: error,
//     // });
//     next(error);
//   }
// };
// with catch async way
const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { password, student: studentData } = req.body;
  const result = await userService.createStudentInDb(password, studentData);
  sentResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Student Created Successfully",
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};
