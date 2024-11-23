const Joi = require('joi');

const healthProfileSchema = Joi.object({
  gender: Joi.string()
  // .valid('male', 'female', 'other') // Menambahkan pilihan valid untuk gender
  .required()
  .messages({
    'any.required': 'Gender wajib diisi.',
    'string.base': 'Gender harus berupa string.',
    'string.empty': 'Gender tidak boleh kosong.',
    // 'any.only': 'Gender harus salah satu dari: male, female, other.',
  }),
  umur: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      'any.required': 'Umur wajib diisi.',
      'number.base': 'Umur harus berupa angka.',
      'number.min': 'Umur tidak boleh bernilai negatif.',
    }),
  tinggi: Joi.number()
    .min(0)
    .required()
    .messages({
      'any.required': 'Tinggi wajib diisi.',
      'number.base': 'Tinggi harus berupa angka.',
      'number.min': 'Tinggi tidak boleh bernilai negatif.',
    }),
  berat: Joi.number()
    .min(0)
    .required()
    .messages({
      'any.required': 'Berat wajib diisi.',
      'number.base': 'Berat harus berupa angka.',
      'number.min': 'Berat tidak boleh bernilai negatif.',
    }),
  BMI: Joi.number()
    .min(0)
    .required()
    .messages({
      'any.required': 'BMI wajib diisi.',
      'number.base': 'BMI harus berupa angka.',
      'number.min': 'BMI tidak boleh bernilai negatif.',
    }),
  userId: Joi.number()
    .integer()
    .required()
    .messages({
      'any.required': 'User ID wajib diisi.',
      'number.base': 'User ID harus berupa angka.',
      'number.integer': 'User ID harus berupa bilangan bulat.',
    }),
  date: Joi.date()
    .optional()
    .messages({
      'date.base': 'Tanggal harus dalam format tanggal yang valid.',
    }),
});

module.exports = { healthProfileSchema };
