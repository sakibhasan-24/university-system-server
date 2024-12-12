import mongoose from "mongoose";
import { Student } from "./student.model";
import appError from "../../error/AppError";
import httpStatus from "http-status";
import User from "../user/user.model";
import { TStudent } from "./student.interface";

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  let searchTerm = "";
  let queryObj = { ...query };
  const studentSearchAbleFields = ["email", "name.firstName", "presentAddress"];
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  const excludes = ["searchTerm", "sort", "limit", "page"];
  excludes.forEach((el) => delete queryObj[el]);
  console.log(query);
  console.log(queryObj, "queryObj");
  // console.log(mongoose.modelNames());

  // const searchQuery = Student.find({
  //   $or: studentSearchAbleFields.map((field) => ({
  //     [field]: searchTerm
  //       ? { $regex: searchTerm, $options: "i" }
  //       : { $nin: studentSearchAbleFields },
  //   })),
  // });
  const searchQuery = Student.find({
    $or: studentSearchAbleFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });
  // filter result
  const filterResult = searchQuery
    .find(queryObj)
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });

  // console.log(filterResult);
  let sort = "-createdAt";
  if (query.sort) {
    sort = query.sort as string;
  }
  // console.log(sort);
  const sortResult = filterResult.sort(sort);
  let limit = 1;
  let page = 1;
  let skip = 0;
  if (query.limit) {
    limit = Number(query.limit as number);
  }
  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }
  // console.log(sortResult, "sortResult");
  const limitQueryResult = sortResult.limit(limit);
  const paginateQuery = await limitQueryResult.skip(skip);
  return paginateQuery;
  // return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.aggregate([{ $match: { id } }]);
  const result = await Student.findOne({ id });
  // .populate("academicDepartment")
  // .populate("admissionSemester");
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      {
        new: true,
        session,
      }
    );
    if (!deletedStudent) {
      throw new appError(httpStatus.BAD_REQUEST, "Failed to delete");
    }
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      session
    );
    if (!deletedUser) {
      throw new appError(httpStatus.BAD_REQUEST, "Failed to delete User");
    }
    await session.commitTransaction();
    await session.endSession();
    // return result;
    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Deleted Process is Failed");
  }
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  // console.log(id);
  const { name, guardian, localGuardian, ...remaingingData } = payload;
  const modifiedUpdateData: Record<string, unknown> = { ...remaingingData };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdateData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdateData[`localGuardian.${key}`] = value;
    }
  }
  const result = await Student.findOneAndUpdate({ id }, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
