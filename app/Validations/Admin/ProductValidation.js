import Joi from "joi";
import { baseJoiValidator } from "../BaseValidation.js";

export const storeUpdateProductValidator = baseJoiValidator(
  Joi.object({
    name: Joi.string().max(250).required().messages({
      "string.base": "Ten san pham phai la chuoi",
      "string.max": "Ten san pham nho hon hoac bang {{#limit}} ky tu",
      "any.required": "Ten san pham khong duoc de trong",
    }),
    price: Joi.string().required().messages({
      "string.base": "Gia phai la chuoi",
      "any.required": "Gia khong duoc de trong",
    }),
    discount: Joi.string().optional().messages({
      "string.base": "Giam gia phai la chuoi",
    }),
    category_id: Joi.string().required().messages({
      "string.base": "category_id phai la chuoi",
      "any.required": "category_id khong duoc de trong"
    }),
    brand_id: Joi.string().required().messages({
      "string.base": "brand_id phai la chuoi",
      "any.required": "brand_id khong duoc de trong"
    })
  })
);

export const indexProductValidator = baseJoiValidator(
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
