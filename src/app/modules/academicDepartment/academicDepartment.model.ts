import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import appError from "../../error/AppError";
import httpStatus from "http-status";

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty",
    },
  },
  { timestamps: true }
);
academicDepartmentSchema.pre("save", async function (next) {
  const isDepartmentExists = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isDepartmentExists)
    throw new appError(httpStatus.NOT_FOUND, "Already Department is Exist");
  next();
});

academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
  const id = this.getQuery();
  const isDepartmentExists = await AcademicDepartment.findOne({
    _id: id,
  });
  if (!isDepartmentExists)
    throw new appError(httpStatus.NOT_FOUND, "Already Department is Deleted");
  next();
});
const AcademicDepartment = model<TAcademicDepartment>(
  "AcademicDepartment",
  academicDepartmentSchema
);

export default AcademicDepartment;
