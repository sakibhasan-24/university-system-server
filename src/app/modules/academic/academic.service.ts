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

const getAllAcademicSemestersFromDB = async () => {
  const result = await academicSemester.find();
  return result;
};

const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await academicSemester.findById(id);
  return result;
};

const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameAndCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error("Invalid Semester Code");
  }

  const result = await academicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDb,
  updateAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
};
