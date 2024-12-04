import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import User from "./user.model";

const createStudentInDb = async (password: string, studnetData: TStudent) => {
  // create a new user
  const userData: Partial<TUser> = {};
  userData.password = password || (config.defaultPassword as string);
  userData.role = "student";
  userData.id = "20103218";
  const result = await User.create(userData);
  console.log(result.id, "res");
  if (result) {
    studnetData.id = result.id;
    studnetData.user = result._id;
    const newStudent = await Student.create(studnetData);

    return newStudent;
  }
};
export const userService = {
  createStudentInDb,
};
