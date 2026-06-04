const joi = require("joi");


const registerSchema = joi.object({

  email: joi.string()
    .custom((value) => value.replace(/\s+/g, ''))
    .lowercase()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'io', 'edu'] } })
    .required()
    .messages({
      'string.empty': 'Email address cannot be empty.',
      'string.email': 'Please enter a valid email address (e.g., name@example.com).',
      'any.required': 'Email is a required field.'
    }),


  password: joi.string()
    .trim()
    .min(8)
    .max(30)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*]).{8,100}$'))
    .required()
    .messages({
      'string.empty': 'Password cannot be empty.',
      'string.min': 'Password must be at least 8 characters long.',
      'string.max': 'Password cannot exceed 30 characters.',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
      'any.required': 'Password is a required field.'
    }),


  role: joi.string()
    .valid("Buyer", "Seller", "Admin")
    .required()
    .messages({
        'any.only': 'role must only be Buyer/Seller/Admin.',
        'any.required': 'role is required field.'
    }),

    name: joi.string()
    .trim()
    .min(3)
    .max(50)
    .required()
    .messages({
        "string.empty": "Name cannot be empty.",
        "string.min": "Name must be at least 3 characters long.",
        "string.max": "Name cannot exceed 50 characters.",
        "any.required": "Name is a required field."
  }),
});


const loginSchema = joi.object({

  email: joi.string()
    .lowercase()
    .email()
    .required(),

  password: joi.string()
    .required()

});

module.exports = { registerSchema, loginSchema};
