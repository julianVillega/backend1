import { Schema, model } from "mongoose";

const collection = "users";

const schema = new Schema({
  photo: {
    Type: String,
    required: false,
    default: "https://random.imagecdn.app/200/200",
  },
  email: { Type: String, required: true },
  password: { Type: String, required: true },
  role: { Type: Number, required: false, default: 0, Enum: [0, 1, 2] },
  isOnline: { Type: Boolean, required: false, default: false },
});

const User = model(collection, schema);
export default User;
