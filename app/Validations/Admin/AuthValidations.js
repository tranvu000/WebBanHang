import Joi from "joi";
import { baseJoiValidator } from "../BaseValidation.js";
import { USERS } from "../../config/constants.js";

export const registerAuthValidator = baseJoiValidator (
  Joi.object({
    username: Joi.string().max(255).required().messages({
      "string.base": "Ho va ten phai la chuoi",
      "string.max": "Ho va ten nho hon hoac bang {{#limit}} ky tu",
      "any.required": " Ho va ten khong duoc de trong"
    }),
    email: Joi.string().email().required().messages({
      "string.base": "Email phai la chuoi",
      "string.emai": "Email khong dung",
      "any.required": "Email khong duoc de trong",
    }),
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
    gender: Joi.number()
      .valid(USERS.gender.male, USERS.gender.female)
      .default(USERS.gender.male)
      .optional()
      .messages({
        "number.base": "Gender phai la number",
        "any.only": "Gender khong hop le"
      }),
    level: Joi.number()
      .valid(USERS.levels.admin, USERS.levels.user)
      .default(USERS.levels.admin)
      .optional()
      .messages({
        "number.base": "Level phai la number",
        "any.only": "Level khong hop le",
      }),
  })
);

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

