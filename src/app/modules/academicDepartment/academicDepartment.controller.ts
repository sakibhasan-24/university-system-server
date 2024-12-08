import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sentResponse from "../../utils/sentResponse";
import { academicDepartmentServices } from "./academicDepartment.service";

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result =
    await academicDepartmentServices.createAcademicDepartmentIntoDb(req.body);
  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department Created Successfully",
    data: result,
  });
});
const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const result =
    await academicDepartmentServices.getAllAcademicDepartmentFromDB();

  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Departments are retrieved successfully",
    data: result,
  });
});

const getSingleAcademicDepartmentFromDB = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result = await academicDepartmentServices.getSingleAcademicDepartment(
    departmentId
  );

  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department is retrieved succesfully",
    data: result,
  });
});

const updateAcademicDepartmentFromDb = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result = await academicDepartmentServices.updateAcademicDepartment(
    departmentId,
    req.body
  );

  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department is updated succesfully",
    data: result,
  });
});
export const academicDepartmentController = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentFromDb,
};
