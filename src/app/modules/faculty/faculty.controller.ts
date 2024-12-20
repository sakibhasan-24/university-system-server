import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { FacultyServices } from "./faculty.service";
import sentResponse from "../../utils/sentResponse";

const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.getSingleFacultyFromDB(id);

  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty is retrieved succesfully",
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAllFacultiesFromDB(req.query);

  console.log(req.query);
  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculties are retrieved succesfully",
    data: result,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculty } = req.body;
  const result = await FacultyServices.updateFacultyIntoDB(id, faculty);

  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty is updated succesfully",
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.deleteFacultyFromDB(id);

  sentResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty is deleted succesfully",
    data: result,
  });
});

export const FacultyControllers = {
  getAllFaculties,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
};
