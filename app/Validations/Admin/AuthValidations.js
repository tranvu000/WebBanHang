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

export const confirmAccountValidator = baseJoiValidator(
  Joi.object({
    token: Joi.string().required().messages({
      "string.base": "Token phai la chuoi",
      "any.required": "Token khong duoc de trong",
    })
  })
);

export const changePasswordValidator = baseJoiValidator(
  Joi.object({
    token: Joi.string().required().messages({
      "string.base": "Token phai la chuoi",
      "any.required": "Token khong duoc de trong",
    }),
    oldPassword: Joi.string().min(8).required().messages({
      "string.base": "oldPassword phai la chuoi",
      "string.min": "oldPassword lon hon hoac bang {{#limit}} ky tu",
      "any.required": "oldPassword khong duoc de trong",
    }),
    newPassword: Joi.string().min(8).required().messages({
      "string.base": "newPassword phai la chuoi",
      "string.min": "newPassword lon hon hoac bang {{#limit}} ky tu",
      "any.required": "newPassword khong duoc de trong",
    }),
  })
);

export const forgotPasswordValidator = baseJoiValidator(
  Joi.object({
    phone: Joi.string().min(10).max(11).required().messages({
      "string.base": "So dien thoai phai la chuoi",
      "string.min": "So dien thoai lon hon hoac bang {{#limit}} ky tu",
      "string.max": "So dien thoai nho hon hoac bang {{#limit}} ky tu",
      "any.required": "So dien thoai khong duoc de trong",
    }),
  })
);

export const resetPasswordValidator = baseJoiValidator(
  Joi.object({
    phone: Joi.string().min(10).max(11).required().messages({
      "string.base": "So dien thoai phai la chuoi",
      "string.min": "So dien thoai lon hon hoac bang {{#limit}} ky tu",
      "string.max": "So dien thoai nho hon hoac bang {{#limit}} ky tu",
      "any.required": "So dien thoai khong duoc de trong",
    }),
    password: Joi.string().min(8).required().messages({
      "string.base": "Password phai la chuoi",
      "string.min": "Password lon hon hoac bang {{#limit}} ky tu",
      "any.required": "Password khong duoc de trong",
    }),
    verifyCode: Joi.string().required().messages({
      "string.base": "verifyCode phai la chuoi",
      "any.required": "verifyCode khong duoc de trong",
    })
  })
);

