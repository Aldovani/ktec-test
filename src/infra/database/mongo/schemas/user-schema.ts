import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: { type: String, auto: true },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const UserModel = mongoose.model("User", userSchema);
