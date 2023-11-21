import Joi from "joi";
import { baseJoiValidator } from "../BaseValidation.js";

export const searchProductBrandValidator = baseJoiValidator(
  Joi.object({
    keyword: Joi.string().max(255).optional().messages({
      'string.base': 'Keyword phai la chuoi',
      'string.max': 'Keyword nho hon hoac bang {{#limit}} ky tu'
    }),
    limit: Joi.number().optional().messages({
      'number.base': 'Limit phai la number'
    }),
    page: Joi.number().optional().messages({
      'number.base': 'Page phai la number'
    }),
  }),
  
  'query'
);

export const listProductBrandValidator = baseJoiValidator(
  Joi.object({
    limit: Joi.number().optional().messages({
      "number.base": "Limit phai la number",
    }),
    page: Joi.number().optional().messages({
      "number.base": "Page phai la number",
    })
  }),

  'query'
);

export const listProductByCategoryValidator = baseJoiValidator(
  Joi.object({
    category_id: Joi.string().required().messages({
      "string.base": "category_id phai la chuoi",
      "any.required": "category_id khong duoc de trong"
    }),
    limit: Joi.number().optional().messages({
      "number.base": "Limit phai la number",
    }),
    page: Joi.number().optional().messages({
      "number.base": "Page phai la number",
    })
  }),

  'query'
);