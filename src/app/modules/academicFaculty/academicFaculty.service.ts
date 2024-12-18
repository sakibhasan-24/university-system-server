import { TAcademicFaculty } from "./academicFaculty.interface";
import AcademicFaculty from "./academicFaculty.model";

const createAcademicFacultyIntoDb = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllAcademicFacultiesFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};
const getSingleAcademicFaculty = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};
const updateAcademicFaculty = async (
  id: string,
  payLoad: Partial<TAcademicFaculty>
) => {
  const result = await AcademicFaculty.findByIdAndUpdate({ _id: id }, payLoad, {
    new: true,
  });
  return result;
};

export const academicFacultyServices = {
  createAcademicFacultyIntoDb,
  getAllAcademicFacultiesFromDB,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
