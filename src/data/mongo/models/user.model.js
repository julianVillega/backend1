import { Schema, model } from "mongoose";

const collection = "users";

const schema = new Schema({
  photo: {
    type: String,
    default: "https://random.imagecdn.app/200/200",
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 0, enum: ["user", "admin"] },
  isOnline: { type: Boolean, default: false },
});

const User = model(collection, schema);
export default User;
