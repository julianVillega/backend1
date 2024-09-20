import Joi from "joi"; // Asegúrate de tener Joi instalado: npm install joi

function validator(req, res, next) {
  // Definir el esquema de validación internamente
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

  // Validar el req.body contra el esquema
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    // Mapear los mensajes de error y lanzarlos
    const message = error.details.map((detail) => detail.message).join(", ");
    const newError = new Error(message);
    newError.statusCode = 400;
    return next(newError);
  }

  next(); // Continuar si no hay errores
}

export default validator;
