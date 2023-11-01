import Joi from "joi";
import { baseJoiValidator } from "../BaseValidation.js";
import { USERS } from "../../config/constants.js";

export const storeUpdateUserValidator = baseJoiValidator(
  Joi.object({
    username: Joi.string().max(255).required().messages({
      "string.base": "Ho ten phai la chuoi",
      "string.max": "Ho ten nho hon hoac bang {{#limit}} ky tu",
      "any.required": "Ho ten khong duoc de trong",
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
    // password: Joi.string().min(8).required().messages({
    //   "string.base": "Password phai la chuoi",
    //   "string.min": "Password lon hon hoac bang {{#limit}} ky tu",
    //   "any.required": "Password khong duoc de trong",
    // }),
    gender: Joi.number()
      .valid(USERS.gender.male, USERS.gender.female)
      .default(USERS.gender.male)
      .messages({
        "number.base": "gender phai la number",
        "any.only": "gender khong hop le",
      }),
    birthday: Joi.date().optional().messages({
      "date.base": "Birthday phai la ngay",
    }),
    level: Joi.number()
      .valid(USERS.levels.admin, USERS.levels.user)
      .default(USERS.levels.admin)
      .messages({
        "number.base": "level phai la number",
        "any.only": "level khong hop le",
      }),
    address: Joi.string().optional().messages({
      "string.base": "Address phai la chuoi",
    }),
    avatar: Joi.string().optional().messages({
      "string.base": "Avatar phai la ipg",
    }),
  })
);

export const IndexUserValidator = baseJoiValidator(
  Joi.object({
    level: Joi.number()
      .valid(USERS.levels.admin, USERS.levels.user)
      .default(USERS.levels.user)
      .optional()
      .messages({
        "number.base": "level phai la number",
        "any.only": "level khong hop le",
      }),
    keyword: Joi.string().optional().messages({
      "string.base": "Keyword phai la chuoi",
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
