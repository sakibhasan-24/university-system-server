import express from "express";
import { userRoutes } from "../modules/user/user.routes";
import { studentRoutes } from "../modules/student/student.routes";
import { academicRoutes } from "../modules/academic/academic.routes";
import { academicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.routes";

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
];

routerModules.forEach((route) => router.use(route.path, route.route));
// router.use("/users", userRoutes);
export default router;
