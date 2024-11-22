import Joi from "joi";

class UserValidations {
  static isValidEmail() {
    return Joi.string()
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
      });
  }

  static isValidPassword() {
    return Joi.string()
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .messages({
        "any.required": "Password is required",
        "string.pattern.base":
          "Password must be a 3 to 30 characters alphanumeric string",
        "string.empty": "Password can not be empty",
      });
  }

  static isValidPhoto() {
    return Joi.string()
      .uri({ scheme: ["http", "https"], allowRelative: false })
      .optional()
      .messages({
        "string.uri": "If present, photo must be a valid URL",
        "string.empty": "If present, photo can not be empty",
      });
  }

  static isValidRole() {
    return Joi.string().alphanum().optional().messages({
      "string.base": "If present, role must be a string",
      "string.alphanum": "If present, role must be alphanumeric",
      "string.empty": "If present, role can not be empty",
    });
  }
}

export { UserValidations }
