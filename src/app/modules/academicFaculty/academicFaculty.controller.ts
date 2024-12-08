import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sentResponse from "../../utils/sentResponse";
import { academicFacultyServices } from "./academicFaculty.service";

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.createAcademicFacultyIntoDb(
    req.body
  );
  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Faculty Created Successfully",
    data: result,
  });
});
const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.getAllAcademicFacultiesFromDB();

  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Faculties are retrieved successfully",
    data: result,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await academicFacultyServices.getSingleAcademicFaculty(
    facultyId
  );

  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semester is retrieved succesfully",
    data: result,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await academicFacultyServices.updateAcademicFaculty(
    facultyId,
    req.body
  );

  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semester is retrieved succesfully",
    data: result,
  });
});
export const academicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
