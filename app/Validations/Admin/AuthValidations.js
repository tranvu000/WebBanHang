import Joi from "joi";
import { baseJoiValidator } from "../BaseValidation.js";

export const loginAuthValidator = baseJoiValidator(
  Joi.object({
    userEmailPhone: Joi.string().required().messages({
      "string.base": "Ten dang nhap phai la chuoi",
      "any.required": "Ten dang nhap khong duoc de trong",
    }),
    password: Joi.string().min(8).required().messages({
      "string.base": "Password phai la chuoi",
      "string.min": "Password lon hon hoac bang {{#limit}} ky tu",
      "any.required": "Password khong duoc de trong",
    }),
  })
);

export const changePasswordAuthValidator = baseJoiValidator(
  Joi.object({
    password: Joi.string().min(8).required().messages({
      "string.base": "Password phai la chuoi",
      "string.min": "Password lon hon hoac bang {{#limit}} ky tu",
      "any.required": "Password khong duoc de trong",
    }),
  })
);
