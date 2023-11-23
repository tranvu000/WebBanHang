import Joi from "joi";
import { baseJoiValidator } from "../BaseValidation.js";
import { PRODUCT } from "../../config/constants.js";

export const storeUpdateProductValidator = baseJoiValidator(
  Joi.object({
    name: Joi.string().max(255).required().messages({
      "string.base": "Ten san pham phai la chuoi",
      "string.max": "Ten san pham nho hon hoac bang {{#limit}} ky tu",
      "any.required": "Ten san pham khong duoc de trong",
    }),
    description: Joi.string().max(1000).messages({
      "string.base": "Mo ta phai la chuoi",
      "string.max": "Mo ta nho hon hoac bang {{#limit}} ky tu",
    }),
    price: Joi.number().required().messages({
      "number.base": "Gia phai la number",
      "any.required": "Gia khong duoc de trong",
    }),
    discount: Joi.number().optional().messages({
      "number.base": "Giam gia phai la number",
    }),
    category_id: Joi.string().required().messages({
      "string.base": "category_id phai la chuoi",
      "any.required": "category_id khong duoc de trong"
    }),
    brand_id: Joi.string().required().messages({
      "string.base": "brand_id phai la chuoi",
      "any.required": "brand_id khong duoc de trong"
    }),
    classifies: Joi.array().items(
      Joi.object({
        name: Joi.string().max(255).required().messages({
          "string.base": "Classify phai la chuoi",
          "string.max": "Classify nho hon hoac bang {{#limit}} ky tu",
          "any.required": "Classify khong duoc de trong",
        }),
        description: Joi.string().max(1000).messages({
          "string.base": "Mo ta phai la chuoi",
          "string.max": "Mo ta nho hon hoac bang {{#limit}} ky tu",
        }),
        classify_values: Joi.array().items(
          Joi.object({
            value: Joi.string().max(255).required().messages({
              "string.base": "Value phai la chuoi",
              "string.max": "Value nho hon hoac bang {{#limit}} ky tu",
              "any.required": "Value khong duoc de trong",
            }),
            image: Joi.string().optional().messages({
              'string.base': 'Image phai la jpg',
            })
          })
        )
      })
    ),
    product_media: Joi.array().items(
      Joi.object({
        url: Joi.string().required().messages({
          'string.base': 'Url phai la chuoi',
          "any.required": "Url khong duoc de trong",
        }),
        type: Joi.number()
          .valid(PRODUCT.type.images, PRODUCT.type.video)
          .default(PRODUCT.type.images)
          .optional()
          .messages({
            "number.base": "Type phai la number",
            "any.only": "Type khong hop le",
          }),
      })
    )
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
);
