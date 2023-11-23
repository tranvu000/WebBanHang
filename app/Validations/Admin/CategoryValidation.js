import Joi from "joi";
import { baseJoiValidator } from "../BaseValidation.js";

export const storeUpdateCategoryValidation = baseJoiValidator(
  Joi.object({
    name: Joi.string().max(255).required().messages({
      'string.base': 'Category phai la chuoi',
      'string.max': 'Category nho hon hoac bang {{#limit}} ky tu',
      'any.required': 'Category khong duoc de trong',
    }),
    image: Joi.string().optional().messages({
      'string.base': 'Image phai la jpg',
    })
  })
);

export const indexCategoryValidation = baseJoiValidator(
  Joi.object({
    name: Joi.string().max(255).optional().messages({
      'string.base': 'Category phai la chuoi',
      'string.max': 'Category nho hon hoac bang {{#limit}} ky tu',
    }),
    limit: Joi.number().optional().messages({
      "number.base": "Limit phai la number",
    }),
    page: Joi.number().optional().messages({
      "number.base": "Page phai la number",
    }),
  }),

  "query"
);