import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.join((process.cwd(), ".env")),
});
export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  dbUri: process.env.DB_URL,
  defaultPassword: process.env.DEFAULT_PASS,
  saltPass: process.env.SALT_PASS,
};
