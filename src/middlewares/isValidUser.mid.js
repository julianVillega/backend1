import Joi from "joi";
import { UserValidations as uv } from "../utils/users.validations.js";

export default function isValidUser(req, res, next) {
  const schema = Joi.object({
    email: uv.isValidEmail(),

    password: uv.isValidPassword(),

    photo: uv.isValidPhoto(),

    role: uv.isValidRole()
  });

  // Validate request body using schema.
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    // Create error and throw it
    const message = error.details.map((detail) => detail.message).join(", ");
    const newError = new Error(message);
    newError.statusCode = 400;
    return next(newError);
  }
  next();
}
