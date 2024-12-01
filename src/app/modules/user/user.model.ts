import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

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
    },
    status: {
      type: String,
      enum: ["blocked", "in-progress"],
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

const user = model<TUser>("user", userSchema);
export default user;
