import { model, Schema } from "mongoose";
import { TAcademicSemester } from "./academic.interface";
import {
  academicSemesterCode,
  academicSemesterName,
  months,
} from "./academic.constant";

const academicSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: academicSemesterName,
      required: true,
    },
    code: {
      type: String,
      enum: academicSemesterCode,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: months,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
academicSchema.pre("save", async function (next) {
  const isSemesterExists = await academicSemester.countDocuments({
    year: this.year,
    name: this.name,
  });
  if (isSemesterExists > 0) {
    throw new Error("Already a semester created");
  }

  next();
});
const academicSemester = model<TAcademicSemester>(
  "AcademicSemester",
  academicSchema
);

export default academicSemester;
