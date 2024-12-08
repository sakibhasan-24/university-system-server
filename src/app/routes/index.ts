import express from "express";
import { userRoutes } from "../modules/user/user.routes";
import { studentRoutes } from "../modules/student/student.routes";
import { academicRoutes } from "../modules/academic/academic.routes";
import { academicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.routes";
import { academicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route";

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
];

routerModules.forEach((route) => router.use(route.path, route.route));
// router.use("/users", userRoutes);
export default router;
