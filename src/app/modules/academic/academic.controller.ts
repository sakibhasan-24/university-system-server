import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sentResponse from "../../utils/sentResponse";
import { Request, Response } from "express";
import { AcademicSemesterServices } from "./academic.service";

const academicSemesterCreate = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDb(
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
const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemestersFromDB();

  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semesters are retrieved successfully",
    data: result,
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDB(
    semesterId
  );

  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semester is retrieved succesfully",
    data: result,
  });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
    semesterId,
    req.body
  );

  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semester is retrieved succesfully",
    data: result,
  });
});
export const academicSemesterController = {
  academicSemesterCreate,
  updateAcademicSemester,
  getSingleAcademicSemester,
  getAllAcademicSemesters,
};
