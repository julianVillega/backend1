import Joi from "joi";

function validator(req, res, next) {
  // Define the schema validation object
  const schema = Joi.object({
    title: Joi.string().required().messages({
      "string.empty": "Title is required",
      "string.base": "title must be a string",
      "any.required": "title is required",
    }),
    price: Joi.number().positive().required().messages({
      "number.base": "Price must be a number",
      "number.positive": "Price must be a positive number",
      "any.required": "Price is required",
    }),
    stock: Joi.number().integer().min(0).required().messages({
      "number.base": "Stock must be a number",
      "number.integer": "Stock must be an integer",
      "number.min": "Stock cannot be negative",
      "any.required": "Stock is required",
    }),
    category: Joi.string().optional().messages({
      "string.base": "Category must be a string",
    }),
    photo: Joi.string().uri().optional().messages({
      "string.uri": "Photo must be a valid URL",
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

  // Set category and photo with default values if necessary.
  !req.body.category && (req.body.category = null)
  !req.body.photo && (req.body.photo = "https://random.imagecdn.app/200/200")

  // Call the next middleware
  next();
}

export default validator;
