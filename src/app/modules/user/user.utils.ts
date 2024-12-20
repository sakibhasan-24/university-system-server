// import { TAcademicSemester } from "../academic/academic.interface";

import { TAcademicSemester } from "../academic/academic.interface";
import User from "./user.model";

// import User from "./user.model";
// const findLastStudentById = async () => {
//   const userId = await User.findOne(
//     { role: "student" },
//     {
//       id: 1,
//       _id: 0,
//     }
//   )
//     .sort({
//       createdAt: -1,
//     })
//     .lean();
//   // return userId?.id ? userId?.id.substring(6) : undefined;
//   // need to know whole id
//   return userId?.id ? userId?.id : undefined;
// };
// export const generateStudentId = async (payLoad: TAcademicSemester) => {
//   // const currentId =
//   //   (await findLastStudentById()) || (0).toString().padStart(4, "0");
//   // let newIncrementID = (Number(currentId) + 1).toString().padStart(4, "0");
//   // newnIcrementID = `${payLoad.year}${payLoad.code}${newIncrementID}`;
//   // return newIncrementID;
//   // need to know academic semester code,year and current ID on this semester
//   let currentId = (0).toString().padStart(4, "0");
//   const lastStudentID = await findLastStudentById();
//   // semesterCode
//   const lastStudentSemesterCode = lastStudentID?.substring(4, 6);
//   const lastStudentYear = lastStudentID?.substring(0, 4);
//   const lastSemesterCode = payLoad?.code;
//   const lastSemesterYear = payLoad?.year;

//   if (
//     lastStudentID &&
//     lastSemesterCode === lastStudentSemesterCode &&
//     lastStudentYear === lastSemesterYear
//   ) {
//     currentId = lastStudentID.substring(6);
//   }
//   let newIncrementID = (Number(currentId) + 1).toString().padStart(4, "0");
//   newIncrementID = `${payLoad.year}${payLoad.code}${newIncrementID}`;
//   return newIncrementID;
// };
// import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
// import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: "student",
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString();
  const lastStudentId = await findLastStudentId();

  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const lastStudentYear = lastStudentId?.substring(0, 4);

  const currentSemesterCode = payload.code;
  const currentYear = payload.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};

// Faculty ID
export const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne(
    {
      role: "faculty",
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async () => {
  let currentId = (0).toString();
  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `F-${incrementId}`;

  return incrementId;
};

// Admin ID
export const findLastAdminId = async () => {
  const lastAdmin = await User.findOne(
    {
      role: "admin",
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `A-${incrementId}`;
  return incrementId;
};
