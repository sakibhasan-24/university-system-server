import { z } from "zod";

const userSchemaValidation = z.object({
  // name: z.string(),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .optional(),
  // needPasswordChange: z.boolean().optional().default(true),
  // role: z.enum(["admin", "student", "faculty"]),
  // status: z.enum(["blocked", "in-progress"]).default("in-progress"),
  // isDeleted: z.boolean().optional().default(false),
});

export default userSchemaValidation;
