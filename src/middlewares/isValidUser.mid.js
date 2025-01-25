import Joi from "joi";

export default function isValidUser(req, res, next) {
  //define the schema validation
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com"] },
      })
      .messages({
        "any.required": "Email is required",
        "string.email":
          "Email must follow the pattern xyz@domain.com, only emails ending in .com are supported",
        "string.empty": "Email cannot be empty",
      }),

    password: Joi.string()
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .messages({
        "any.required": "Password is required",
        "string.pattern.base":
          "Password must be a 3 to 30 characters alphanumeric string",
        "string.empty": "Password can not be empty",
      }),

    photo: Joi.string()
      .uri({ scheme: ["http", "https"], allowRelative: false })
      .optional()
      .messages({
        "string.uri": "If present, photo must be a valid URL",
        "string.empty": "If present, photo can not be empty",
      }),

    role: Joi.string().alphanum().optional().messages({
      "string.base": "If present, role must be a string",
      "string.alphanum": "If present, role must be alphanumeric",
      "string.empty": "If present, role can not be empty",
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
  next();
}
