import mongoose from "mongoose";
import config from "../../config";
import academicSemester from "../academic/academic.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import User from "./user.model";
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from "./user.utils";
// import appError from "../../error/appError";
import httpStatus from "http-status";
// import sentResponse from "../../utils/sentResponse";
import appError from "../../error/AppError";
import AcademicDepartment from "../academicDepartment/academicDepartment.model";
import { Faculty } from "../faculty/faculty.model";
import { TAdmin } from "../admin/admin.interface";
import { Admin } from "../admin/admin.model";
import { TFaculty } from "../faculty/faculty.interface";

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
const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.defaultPassword as string);

  //set student role
  userData.role = "faculty";

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment
  );

  if (!academicDepartment) {
    throw new appError(400, "Academic department not found");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new appError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new appError(httpStatus.BAD_REQUEST, "Failed to create faculty");
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.defaultPassword as string);

  //set student role
  userData.role = "admin";

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new appError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new appError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
export const userService = {
  createStudentInDb,
  createFacultyIntoDB,
  createAdminIntoDB,
};
