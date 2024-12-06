import { model, Schema } from "mongoose";
import { TAcademicSemester, TMonth } from "./academic.interface";
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

const academicSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      tyep: String,
      required: true,
    },
    year: {
      type: Date,
      required: true,
    },
    startMonth: {
      type: String,
      enum: months,
    },
    endMonth: {
      type: String,
      enum: months,
    },
  },
  {
    timestamps: true,
  }
);

const academicSemester = model<TAcademicSemester>(
  "AcademicSemester",
  academicSchema
);

export default academicSemester;
