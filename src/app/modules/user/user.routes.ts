import express, { NextFunction, Request, Response } from "express";
import { UserControllers } from "./user.controller";
import { createStudentValidationSchema } from "../student/student.validation";
import validateRequest from "../../middleware/validateRequest";
import { createFacultyValidationSchema } from "../faculty/faculty.validation";
import { createAdminValidationSchema } from "../admin/admin.validation";

const router = express.Router();
// const validateRequest = (schema: AnyZodObject) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await schema.parseAsync({ body: req.body });
//       next();
//     } catch (error) {
//       next(error);
//     }
//   };
// };
router.post(
  "/create-student",
  // validateRequest(createStudentValidationSchema),
  UserControllers.createStudent
);
router.post(
  "/create-faculty",
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty
);

router.post(
  "/create-admin",
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin
);

export const userRoutes = router;
