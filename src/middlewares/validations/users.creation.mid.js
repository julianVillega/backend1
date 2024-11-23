import { UserValidations as uv } from "../../utils/users.validations.js";

export default function validateCreation(req, res, next) {
  try {
    const schema = uv.schemaForFields("email", "password", "photo", "role");

    // Validate request body using schema.
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      // Create error and throw it
      const message = error.details.map((detail) => detail.message).join(", ");
      const newError = new Error(message);
      newError.statusCode = 400;
      throw newError;
    }
    next();
  } catch (error) {
    return next(error);
  }
}
