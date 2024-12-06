import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sentResponse from "../../utils/sentResponse";
import { Request, Response } from "express";
import { AcademicSemesterServicesw } from "./academic.service";

const academicSemesterCreate = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicSemesterServicesw.createAcademicSemesterIntoDb(
      req.body
    );
    sentResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Semester is Created Successfully",
      data: result,
    });
  }
);
export const academicSemesterController = {
  academicSemesterCreate,
};
