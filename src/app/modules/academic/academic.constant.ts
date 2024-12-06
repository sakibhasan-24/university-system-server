import {
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TAcademicSemesterNameAndCodeMapper,
  TMonth,
} from "./academic.interface";

export const months: TMonth[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const academicSemesterName: TAcademicSemesterName[] = [
  "Autumn",
  "Summer",
  "Fall",
];
export const academicSemesterCode: TAcademicSemesterCode[] = ["01", "02", "03"];
export const academicSemesterNameAndCodeMapper: TAcademicSemesterNameAndCodeMapper =
  {
    Autumn: "01",
    Summer: "02",
    Fall: "03",
  };
