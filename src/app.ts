import express from "express";
const app = express();
const port = 3000;

export default app.get("/", (req, res) => {
  res.send("Hello World!");
});
