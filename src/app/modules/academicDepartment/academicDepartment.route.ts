import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { academicDepartmentSchemaCreateValidation } from "./academicDepartment.validation";
import { academicDepartmentController } from "./academicDepartment.controller";

const router = express.Router();

router.post(
  "/create-academic-department",
  validateRequest(
    academicDepartmentSchemaCreateValidation.academicDepartmnetCreateValidationSchema
  ),
  academicDepartmentController.createAcademicFaculty
);
router.get(
  "/:departmentId",
  academicDepartmentController.getSingleAcademicDepartmentFromDB
);

router.patch(
  "/:departmentId",
  validateRequest(
    academicDepartmentSchemaCreateValidation.academicDepartmentValidationSchemaUpdate
  ),
  academicDepartmentController.updateAcademicDepartmentFromDb
);

router.get("/", academicDepartmentController.getAllAcademicFaculties);
export const academicDepartmentRoutes = router;
