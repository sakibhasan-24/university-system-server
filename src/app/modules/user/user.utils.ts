import { TAcademicSemester } from "../academic/academic.interface";

import User from "./user.model";
const findLastStudentById = async () => {
  const userId = await User.findOne(
    { role: "student" },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  // return userId?.id ? userId?.id.substring(6) : undefined;
  // need to know whole id
  return userId?.id ? userId?.id : undefined;
};
export const generateStudentId = async (payLoad: TAcademicSemester) => {
  // const currentId =
  //   (await findLastStudentById()) || (0).toString().padStart(4, "0");
  // let newIncrementID = (Number(currentId) + 1).toString().padStart(4, "0");
  // newnIcrementID = `${payLoad.year}${payLoad.code}${newIncrementID}`;
  // return newIncrementID;
  // need to know academic semester code,year and current ID on this semester
  let currentId = (0).toString().padStart(4, "0");
  const lastStudentID = await findLastStudentById();
  // semesterCode
  const lastStudentSemesterCode = lastStudentID?.substring(4, 6);
  const lastStudentYear = lastStudentID?.substring(0, 4);
  const lastSemesterCode = payLoad?.code;
  const lastSemesterYear = payLoad?.year;

  if (
    lastStudentID &&
    lastSemesterCode === lastStudentSemesterCode &&
    lastStudentYear === lastSemesterYear
  ) {
    currentId = lastStudentID.substring(6);
  }
  let newIncrementID = (Number(currentId) + 1).toString().padStart(4, "0");
  newIncrementID = `${payLoad.year}${payLoad.code}${newIncrementID}`;
  return newIncrementID;
};
