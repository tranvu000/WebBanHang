import Joi from "joi";
import { baseJoiValidator } from "../BaseValidation.js";

export const storeUpdateProductValidator = baseJoiValidator(
  Joi.object({
    name: Joi.string().max(50).required().messages({
      "string.base": "Ten san pham phai la chuoi",
      "string.max": "Ten san pham nho hon hoac bang {{#limit}} ky tu",
      "any.required": "Ten san pham khong duoc de trong",
    }),
    prices: Joi.string().required().messages({
      "string.base": "Gia phai la chuoi",
      "any.require": "Gia khong duoc de trong",
    }),
  })
);
