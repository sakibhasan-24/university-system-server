import express from "express";
import { userRoutes } from "../modules/user/user.routes";
import { studentRoutes } from "../modules/student/student.routes";
import { academicRoutes } from "../modules/academic/academic.routes";
import { academicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.routes";
import { academicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route";
import { FacultyRoutes } from "../modules/faculty/faculty.routes";
import { AdminRoutes } from "../modules/admin/admin.routes";
import { CourseRoutes } from "../modules/course/course.routes";
import { semesterRegistrationRoutes } from "../../semesterRegistration/semesterRegistration.routes";

const router = express.Router();
const routerModules = [
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/students",
    route: studentRoutes,
  },
  {
    path: "/faculties",
    route: FacultyRoutes,
  },
  {
    path: "/admins",
    route: AdminRoutes,
  },
  {
    path: "/academic-semester",
    route: academicRoutes,
  },
  {
    path: "/academic-faculty",
    route: academicFacultyRoutes,
  },
  {
    path: "/academic-department",
    route: academicDepartmentRoutes,
  },
  {
    path: "/courses",
    route: CourseRoutes,
  },
  {
    path: "/semester-registrations",
    route: semesterRegistrationRoutes,
  },
];

routerModules.forEach((route) => router.use(route.path, route.route));
// router.use("/users", userRoutes);
export default router;
