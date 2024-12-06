import express from "express";
import { academicSemesterController } from "./academic.controller";
import validateRequest from "../../middleware/validateRequest";
import { AcademicSemesterValidation } from "./academic.validation";

const router = express.Router();

router.post(
  "/create-academic-semester",
  validateRequest(
    AcademicSemesterValidation.academicSemesterCreateValidationSchema
  ),
  academicSemesterController.academicSemesterCreate
);
router.get(
  "/:semesterId",
  academicSemesterController.getSingleAcademicSemester
);

router.patch(
  "/:semesterId",
  validateRequest(
    AcademicSemesterValidation.updateAcademicSemesterValidationSchema
  ),
  academicSemesterController.updateAcademicSemester
);

router.get("/", academicSemesterController.getAllAcademicSemesters);
export const academicRoutes = router;
