import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["student", "admin", "faculty"],
      // default: "student",
    },
    status: {
      type: String,
      enum: ["blocked", "in-progress"],
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  this.password = await bcrypt.hash(user.password, Number(config.saltPass));
  next();
});
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});
const User = model<TUser>("user", userSchema);
export default User;
