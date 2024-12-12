import { UserValidations as uv } from "../../utils/users.validations.js";

export default function validateCredentials(req, res, next) {
  const schema = uv.schemaForFields("email", "password");
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    // Create error and throw it
    const message = error.details.map((detail) => detail.message).join(", ");
    const newError = new Error(message);
    newError.statusCode = 400;
    throw newError;
  }
  next();
}
