import { TAcademicSemester } from "../academic/academic.interface";

export const generateStudentId = (payLoad: TAcademicSemester) => {
  const currentId = (0).toString().padStart(4, "0");
  let newIncrementID = (Number(currentId) + 1).toString().padStart(4, "0");
  newIncrementID = `${payLoad.year}${payLoad.code}${newIncrementID}`;

  return newIncrementID;
};
