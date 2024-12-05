import express from "express";
import { studentController } from "./student.controller";

const router = express.Router();
// router.get("");
router.get("/:semesterIdId", studentController.getSingleStudent);

router.delete("/:semesterIdId", studentController.deleteStudent);

router.get("/", studentController.getAllStudents);
export const studentRoutes = router;
