import express from "express";
import { userRoutes } from "../modules/user/user.routes";
import { studentRoutes } from "../modules/student/student.routes";

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
];

routerModules.forEach((route) => router.use(route.path, route.route));
// router.use("/users", userRoutes);
export default router;
