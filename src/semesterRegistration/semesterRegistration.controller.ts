import { Request, Response } from "express";
import httpStatus from "http-status";
import { SemesterRegistrationService } from "./semesterRegistration.service";

import catchAsync from "../app/utils/catchAsync";
import sentResponse from "../app/utils/sentResponse";

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    console.log(req.body);
    const result =
      await SemesterRegistrationService.createSemesterRegistrationIntoDB(
        req.body
      );

    sentResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Semester Registration is created successfully!",
      data: result,
    });
  }
);

const getAllSemesterRegistrations = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationService.getAllSemesterRegistrationsFromDB(
        req.query
      );

    sentResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Semester Registration is retrieved successfully !",
      data: result,
    });
  }
);

const getSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result =
      await SemesterRegistrationService.getSingleSemesterRegistrationsFromDB(
        id
      );

    sentResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Semester Registration is retrieved successfully",
      data: result,
    });
  }
);

const updateSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await SemesterRegistrationService.updateSemesterRegistrationIntoDB(
        id,
        req.body
      );

    sentResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Semester Registration is updated successfully",
      data: result,
    });
  }
);

// const deleteSemesterRegistration = catchAsync(
//   async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const result =
//       await SemesterRegistrationService.deleteSemesterRegistrationFromDB(id);

//     sentResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: "Semester Registration is updated successfully",
//       data: result,
//     });
//   }
// );

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  //   deleteSemesterRegistration,s
};
