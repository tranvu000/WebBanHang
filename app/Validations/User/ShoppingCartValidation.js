import Joi from "joi";
import { baseJoiValidator } from "../BaseValidation.js";

export const storeShoppingCartValidator = baseJoiValidator(
  Joi.object({
    product_id: Joi.string().required().messages({
      "string.base": "product_id phai la chuoi",
      "any.required": "product_id khong duoc de trong"
    }),
    quantity: Joi.number().optional().messages({
      "number.base": "So luong phai la number"
    }),
    shoppingCartClassifyValues: Joi.array().items(
      Joi.object({
        classifyValue_id: Joi.string().required().messages({
          "string.base": "classifyValue_id phai la chuoi",
          "any.required": "classifyValue_id khong duoc de trong"
        })
      })
    )
  })
);

export const updateShoppingCartValidator = baseJoiValidator(
  Joi.object({
    quantity: Joi.number().optional().messages({
      "number.base": "So luong phai la number"
    }),
    shoppingCartClassifyValues: Joi.array().items(
      Joi.object({
        classifyValue_id: Joi.string().required().messages({
          "string.base": "classifyValue_id phai la chuoi",
          "any.required": "classifyValue_id khong duoc de trong"
        })
      })
    )
  })
);