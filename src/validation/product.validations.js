const joi = require("joi");


const createProductSchema = joi.object({
  name: joi.string()
    .trim()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.empty": "Product name cannot be empty.",
      "string.min": "Product name must be at least 3 characters long.",
      "string.max": "Product name cannot exceed 100 characters.",
      "any.required": "Product name is a required field."
    }),

  price: joi.number()
    .positive()
    .required()
    .messages({
      "number.base": "Price must be a number.",
      "number.positive": "Price must be a positive number.",
      "any.required": "Price is a required field."
    }),

  description: joi.string()
    .trim()
    .max(1000)
    .required()
    .messages({
      "string.empty": "Description cannot be empty.",
      "string.max": "Description cannot exceed 1000 characters.",
      "any.required": "Description is a required field."
    }),


  stock: joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      "number.base": "Stock must be a number.",
      "number.integer": "Stock must be a whole number.",
      "number.min": "Stock cannot be negative.",
      "any.required": "Stock count is a required field."
    })
});


const updateProductSchema = createProductSchema.fork(
  ["name", "price", "description", "stock"],
  (schema) => schema.optional()
);

module.exports = { createProductSchema, updateProductSchema };