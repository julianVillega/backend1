import Joi from "joi";

class UserValidations {
  static validationFunctions = {
    email: UserValidations.emailSchema,
    password: UserValidations.passwordSchema,
    photo: UserValidations.photoSchema,
    role: UserValidations.roleSchema,
  };
  constructor() {}
  static validationsForFields(...fieldNames) {
    try {
      // check if all fields are supported
      const supportedFields = Object.keys(UserValidations.validationFunctions);
      for (const field of fieldNames) {
        if (!supportedFields.includes(field)) {
          const error = new Error();
          error.message = `${field} is not a valid field for users `;
          throw error;
        }
      }

      // build Joi validation schema.
      const validationObject = {}
      for(const field of fieldNames){
        validationObject[field] = UserValidations.validationFunctions[field]()
      } 
      const schema = Joi.object(validationObject);
      
      const validationFunction = (req, res, next) =>{
        // const values = fieldNames.map(field => req.body[field])
        
        const values = fieldNames.reduce((acc, key) => {
          if (key in req.body) acc[key] = req.body[key];
          return acc;
        }, {});
        
        const { error } = schema.validate(values, { abortEarly: false });
      
        if (error) {
          // Create error and throw it
          const message = error.details.map((detail) => detail.message).join(", ");
          const newError = new Error(message);
          newError.statusCode = 400;
          throw newError;
        }
        next();
      }
      return validationFunction;
    } catch (error) {
      throw error;
    }
  }

  static emailSchema() {
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

  static passwordSchema() {
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

  static photoSchema() {
    return Joi.string()
      .uri({ scheme: ["http", "https"], allowRelative: false })
      .optional()
      .messages({
        "string.uri": "If present, photo must be a valid URL",
        "string.empty": "If present, photo can not be empty",
      });
  }

  static roleSchema() {
    return Joi.string().alphanum().optional().messages({
      "string.base": "If present, role must be a string",
      "string.alphanum": "If present, role must be alphanumeric",
      "string.empty": "If present, role can not be empty",
    });
  }
}

export { UserValidations };
