import mongoose from "mongoose";
import { Student } from "./student.model";

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
  const result = await Student.aggregate([{ $match: { id } }]);
  // .populate("academicDepartment")
  // .populate("admissionSemester");
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
