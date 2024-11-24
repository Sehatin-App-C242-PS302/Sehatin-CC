const Joi = require('joi');

const healthProfileSchema = Joi.object({
  gender: Joi.string().required().messages({
    'any.required': 'Gender is required.',
    'string.empty': 'Gender cannot be empty.',
  }),
  age: Joi.number().integer().min(0).required().messages({
    'any.required': 'Age is required.',
    'number.base': 'Age must be a number.',
    'number.min': 'Age cannot be negative.',
  }),
  height: Joi.number().min(0).required().messages({
    'any.required': 'Height is required.',
    'number.base': 'Height must be a number.',
    'number.min': 'Height cannot be negative.',
  }),
  weight: Joi.number().min(0).required().messages({
    'any.required': 'Weight is required.',
    'number.base': 'Weight must be a number.',
    'number.min': 'Weight cannot be negative.',
  }),
  userId: Joi.number().integer().required().messages({
    'any.required': 'User ID is required.',
    'number.base': 'User ID must be a number.',
    'number.integer': 'User ID must be an integer.',
  }),
  date: Joi.date().optional(),
});

module.exports = { healthProfileSchema };
