import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { StudentServices } from "./student.service";
import sentResponse from "../../utils/sentResponse";
import httpStatus from "http-status";

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);
  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is retrieved succesfully",
    data: result,
  });
});
const getAllStudents: RequestHandler = catchAsync(async (req, res) => {
  console.log(req.url);
  const result = await StudentServices.getAllStudentsFromDB();

  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student are retrieved succesfully",
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentId);

  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is deleted succesfully",
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateStudentIntoDB(studentId, student);
  // console.log(result);
  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is Updated Successfully",
    data: result,
  });
});

export const studentController = {
  deleteStudent,
  getSingleStudent,
  getAllStudents,
  updateStudent,
};
