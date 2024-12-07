import { model, Schema } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";

const academicFacultSchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);
const AcademicFaculty = model<TAcademicFaculty>(
  "AcademicFaculty",
  academicFacultSchema
);
export default AcademicFaculty;
