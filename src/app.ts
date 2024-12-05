import express from "express";
import cors from "cors";
import { userRoutes } from "./app/modules/user/user.routes";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";
import router from "./app/routes";
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.use("/api/v1", router);
// app.use("/api/v1/students");

// global error handle
app.use(globalErrorHandler);
app.use(notFound);
export default app.get("/", (req, res) => {
  res.send("Hello World!");
});
