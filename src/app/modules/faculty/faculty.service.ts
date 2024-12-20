import httpStatus from "http-status";
import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
// import AppError from "../../errors/AppError";
// import { User } from "../user/user.model";
import { FacultySearchableFields } from "./faculty.constant";
import { TFaculty } from "./faculty.interface";
import { Faculty } from "./faculty.model";
import appError from "../../error/AppError";
import User from "../user/user.model";
// import User from "../user/user.model";

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  console.log("faculty");
  const test = await Faculty.find();
  // // console.log(test);
  // console.log("faculty");
  // const baseQuery = Faculty.find().populate("academicDepartment");

  // // Test `search` method
  // const searchQuery = new QueryBuilder(baseQuery, query).search(
  //   FacultySearchableFields
  // );
  // console.log("After search:", searchQuery.modelQuery);

  // // Test `filter` method
  // const filterQuery = searchQuery.filter();
  // console.log("After filter:", filterQuery.modelQuery);

  // // Test `sort` method
  // const sortQuery = filterQuery.sort();
  // console.log("After sort:", sortQuery.modelQuery);

  // // Test `paginate` method
  // const paginateQuery = sortQuery.paginate();
  // console.log("After paginate:", paginateQuery.modelQuery);

  // // Test `fields` method
  // const finalQuery = paginateQuery.fields();
  // console.log("Final Query Object:", finalQuery.modelQuery);

  // // Execute query
  // const result = await finalQuery.modelQuery;
  // console.log("Result:", result);

  // return result;

  // const facultyQuery = new QueryBuilder(
  //   Faculty.find().populate("academicDepartment"),
  //   query
  // )
  //   .search(FacultySearchableFields)
  //   .filter()
  //   .sort()
  //   .paginate()
  //   .fields();

  // // console.log(facultyQuery);
  // const result = await facultyQuery.modelQuery;
  // console.log(result);
  return test;
};

const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findById(id).populate("academicDepartment");

  return result;
};

const updateFacultyIntoDB = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainingFacultyData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingFacultyData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Faculty.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedFaculty = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedFaculty) {
      throw new appError(httpStatus.BAD_REQUEST, "Failed to delete faculty");
    }

    // get user _id from deletedFaculty
    const userId = deletedFaculty.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new appError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const FacultyServices = {
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDB,
  deleteFacultyFromDB,
};
