import { z } from "zod";

const academicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Academic Faculty must be string/require",
    }),
  }),
});
const academicFacultyValidationSchemaUpdate = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Academic Faculty must be string/require",
    }),
  }),
});

export const academicFacultSchemaCreateValidation = {
  academicFacultyValidationSchema,
  academicFacultyValidationSchemaUpdate,
};
