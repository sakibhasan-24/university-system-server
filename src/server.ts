import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";
import { Server } from "http";

async function main() {
  await mongoose.connect(config.dbUri as string);
}
let server: Server;
server = app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`);
});
main();
process.on("unhandledRejection", () => {
  console.log(` unahandledRejection is detected , shutting down ...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
process.on("uncaughtException", () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
// console.log(hello);
