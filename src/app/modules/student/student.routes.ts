import express from "express";
import { studentController } from "./student.controller";
import validateRequest from "../../middleware/validateRequest";
import { updateStudentValidationSchema } from "./student.validation";

const router = express.Router();
// router.get("");
router.get("/:studentId", studentController.getSingleStudent);

router.delete("/:studentId", studentController.deleteStudent);

router.get("/", studentController.getAllStudents);
router.patch(
  "/:studentId",
  validateRequest(updateStudentValidationSchema),
  studentController.updateStudent
);
export const studentRoutes = router;
