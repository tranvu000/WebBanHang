import Joi from "joi";
import { baseJoiValidator } from "../BaseValidation.js";

export const storeUpdateBrandValidation = baseJoiValidator(
  Joi.object({
    name: Joi.string().max(255).required().messages({
      'string.base': 'Ten san pham phai la chuoi',
      'string.max': 'Ten san pham nho hon hoac bang {{#limit}} ky tu',
      'any.required': 'Ten san pham khong duoc de trong',
    }),
    description: Joi.string().optional().messages({
      'string.base': 'Mo ta phai la chuoi',
    }),
    logo: Joi.string().optional().messages({
      'string.base': 'Logo phai la chuoi',
    })
  })
);

export const indexBrandValidation = baseJoiValidator(
  Joi.object({
    name: Joi.string().max(255).optional().messages({
      'string.base': 'Ten san pham phai la chuoi',
      'string.max': 'Ten san pham nho hon hoac bang {{#limit}} ky tu',
    }),
    limit: Joi.number().optional().messages({
      "number.base": "Limit phai la number",
    }),
    page: Joi.number().optional().messages({
      "number.base": "Page phai la number",
    }),
  }),

  "query"
)