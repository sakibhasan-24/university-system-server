import mongoose from "mongoose";
import config from "../../config";
import academicSemester from "../academic/academic.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import User from "./user.model";
import { generateStudentId } from "./user.utils";
import appError from "../../error/AppError";
import httpStatus from "http-status";

const createStudentInDb = async (password: string, payLoad: TStudent) => {
  // create a new user
  const userData: Partial<TUser> = {};
  userData.password = password || (config.defaultPassword as string);
  userData.role = "student";
  // userData.id = "20103218"; //manual way,
  // now create id automaticallyt

  const admissionSemester = await academicSemester.findById(
    payLoad.admissionSemester
  );
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    if (admissionSemester !== null) {
      userData.id = await generateStudentId(admissionSemester);
    }
    // const result = await User.create(userData);
    const result = await User.create([userData], { session });
    // console.log(result.id, "res");
    if (!result.length) {
      throw new appError(httpStatus.BAD_GATEWAY, "User is failed to create");
    }
    payLoad.id = result[0].id;
    payLoad.user = result[0]._id;
    const newStudent = await Student.create([payLoad], { session });
    if (!newStudent) {
      throw new appError(httpStatus.BAD_REQUEST, "Student is not created");
    }
    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};
export const userService = {
  createStudentInDb,
};
