import Joi from "joi";
import { baseJoiValidator } from "../BaseValidation.js";

export const storeOrderValidator = baseJoiValidator(
  Joi.object({
    status: Joi.number().required().messages({
      "number.base": "Status phai la number",
      "any.required": "Status khong duoc de trong"
    }),
    order_details: Joi.array().items(
      Joi.object({
        product_id: Joi.string().required().messages({
          "string.base": "product_id phai la chuoi",
          "any.required": "product_id khong duoc de trong"
        }),
        price: Joi.number().optional().messages({
          "number.base": "Gia phai la number"
        }),
        quantity: Joi.number().optional().messages({
          "number.base": "So luong phai la number"
        }),
        orderDetailClassifyValues: Joi.array().items(
          Joi.object({
            classifyValue_id: Joi.string().required().messages({
              "string.base": "classifyValue_id phai la chuoi",
              "any.required": "classifyValue_id khong duoc de trong"
            })
          })
        )
      })
    )
  })
);

export const updateOrderValidator = baseJoiValidator(
  Joi.object({
    status: Joi.number().required().messages({
      "number.base": "Status phai la number",
      "any.required": "Status khong duoc de trong"
    })
  })
);

export const indexOrderValidator = baseJoiValidator(
  Joi.object({
    keyword: Joi.string().max(255).optional().messages({
      'string.base': 'Ten tim kiem phai la chuoi',
      'string.max': 'Ten tim kiem nho hon hoac bang {{#limit}} ky tu',
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