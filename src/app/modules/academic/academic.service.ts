import { academicSemesterNameAndCodeMapper } from "./academic.constant";
import { TAcademicSemester } from "./academic.interface";
import academicSemester from "./academic.model";

const createAcademicSemesterIntoDb = async (payLoad: TAcademicSemester) => {
  // need to follow Autumn 01,Summer 02,Fall 03

  console.log(academicSemesterNameAndCodeMapper[payLoad.name]);
  if (academicSemesterNameAndCodeMapper[payLoad.name] !== payLoad.code) {
    throw new Error("Invalid Semester Type");
  }
  const result = await academicSemester.create(payLoad);
  return result;
};

export const AcademicSemesterServicesw = {
  createAcademicSemesterIntoDb,
};
