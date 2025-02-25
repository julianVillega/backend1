import { Schema, model } from "mongoose";

const collection = "users";

const schema = new Schema({
  photo: {
    type: String,
    default: "https://random.imagecdn.app/200/200",
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "USER", enum: ["USER", "ADMIN"] },
  isOnline: { type: Boolean, default: false },
  verificationCode: { type: String, default: "verificationCode" },
  isVerified: { type: Boolean, default: false },
  passwordRecoveryCode: { type: String, default: "" },
});

const User = model(collection, schema);
export default User;
