import { TAcademicSemester } from "./academic.interface";
import academicSemester from "./academic.model";

const createAcademicSemesterIntoDb = async (payLoad: TAcademicSemester) => {
  const result = await academicSemester.create(payLoad);
  return result;
};

export const AcademicSemesterServicesw = {
  createAcademicSemesterIntoDb,
};
