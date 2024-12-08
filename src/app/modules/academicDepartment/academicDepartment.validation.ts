import { z } from "zod";

const academicDepartmnetCreateValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Academic Faculty must be string/require",
    }),
    academicFaculty: z.string({
      invalid_type_error: "Academic Faculty must be string/require",
      required_error: "Academic Faculty is rwquired",
    }),
  }),
});
const academicDepartmentValidationSchemaUpdate = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Academic Faculty must be string/require",
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: "Academic Faculty must be string/require",
        required_error: "Academic Faculty is rwquired",
      })
      .optional(),
  }),
});

export const academicDepartmentSchemaCreateValidation = {
  academicDepartmentValidationSchemaUpdate,
  academicDepartmnetCreateValidationSchema,
};
