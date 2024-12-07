import config from "../../config";
import academicSemester from "../academic/academic.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import User from "./user.model";
import { generateStudentId } from "./user.utils";

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
  if (admissionSemester !== null) {
    userData.id = await generateStudentId(admissionSemester);
  }
  const result = await User.create(userData);
  // console.log(result.id, "res");
  if (result) {
    payLoad.id = result.id;
    payLoad.user = result._id;
    const newStudent = await Student.create(payLoad);

    return newStudent;
  }
};
export const userService = {
  createStudentInDb,
};
