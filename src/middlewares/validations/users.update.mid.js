import { UserValidations as uv } from "../../utils/users.validations.js";

export default async function validateUpdate(req,res,next){
  try {
    // create validation schema
    const schema = uv.schemaForFields(...Object.keys(req.body));
  
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
    next(error)
  }
}