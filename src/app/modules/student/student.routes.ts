import express from "express";
import { studentController } from "./student.controller";
import validateRequest from "../../middleware/validateRequest";
import { updateStudentValidationSchema } from "./student.validation";

const router = express.Router();
// router.get("");
router.get("/:Id", studentController.getSingleStudent);

router.delete("/:Id", studentController.deleteStudent);

router.get("/", studentController.getAllStudents);
router.patch(
  "/:Id",
  validateRequest(updateStudentValidationSchema),
  studentController.updateStudent
);
export const studentRoutes = router;
