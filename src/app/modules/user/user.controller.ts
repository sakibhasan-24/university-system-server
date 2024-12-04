import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password, student: studentData } = req.body;
  // console.log(studentData);
  //   console.log(req.body);
  try {
    const result = await userService.createStudentInDb(password, studentData);
    res.status(201).json({
      success: true,
      message: "STUDENT CREATED SUCCESSFULLY",
      data: result,
    });
  } catch (error) {
    console.log(error);
    // res.status(500).json({
    //   success: false,
    //   message: error.message || "Something Went Wrong!",
    //   error: error,
    // });
    next(error);
  }
};

export const UserControllers = {
  createStudent,
};
