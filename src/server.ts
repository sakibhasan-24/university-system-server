import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";

async function main() {
  await mongoose.connect(config.dbUri as string);
}
app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`);
});
main();
