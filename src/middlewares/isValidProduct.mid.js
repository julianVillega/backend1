import Joi from "joi";

function validator(req, res, next) {
  // Define the schema validation object
  const schema = Joi.object({
    title: Joi.string().required().messages({
      "string.empty": "Title can not be empty",
      "string.base": "Title must be a string",
      "any.required": "Title is required",
    }),
    price: Joi.number().positive().optional().messages({
      "number.base": "If present, price must be a number",      
      "number.positive": "If present, price must be a positive number",
    }),
    stock: Joi.number().integer().min(0).optional().messages({
      "number.base": "If present, stock must be a number",
      "number.integer": "If present, stock must be an integer",
      "number.min": "If present, stock cannot be negative",
    }),
    category: Joi.string().optional().messages({
      "string.base": "If present, category must be a string",
      "string.empty":"If present, category can not be empty",
    }),
    photo: Joi.string().uri().optional().messages({
      "string.uri": "If present, photo must be a valid URL, only http and https protocols are supported",
      "string.empty": "If present, present, photo can not be empty"
    }),
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

  // Call the next middleware
  next();
}

export default validator;
