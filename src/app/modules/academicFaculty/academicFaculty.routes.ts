import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { academicFacultSchemaCreateValidation } from "./academicFaculty.validation";
import { academicFacultyController } from "./academicFaculty.controller";

const router = express.Router();

router.post(
  "/create-academic-faculty",
  validateRequest(
    academicFacultSchemaCreateValidation.academicFacultyValidationSchema
  ),
  academicFacultyController.createAcademicFaculty
);
router.get("/:facultyId", academicFacultyController.getSingleAcademicFaculty);

router.patch(
  "/:facultyId",
  validateRequest(
    academicFacultSchemaCreateValidation.academicFacultyValidationSchemaUpdate
  ),
  academicFacultyController.updateAcademicFaculty
);

router.get("/", academicFacultyController.getAllAcademicFaculties);
export const academicFacultyRoutes = router;
