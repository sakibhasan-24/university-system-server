import mongoose from "mongoose";
import { Student } from "./student.model";
import appError from "../../error/AppError";
import httpStatus from "http-status";
import User from "../user/user.model";
import { TStudent } from "./student.interface";

const getAllStudentsFromDB = async () => {
  console.log(mongoose.modelNames());
  const result = await Student.find()
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });

  return result;
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
