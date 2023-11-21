import Joi from "joi";
import { baseJoiValidator } from "../BaseValidation.js";

export const updateProfileValidator = baseJoiValidator(
  Joi.object({
    username: Joi.string().max(255).optional().messages({
      'string.base': 'Username phai la chuoi',
      'string.max': 'Username nho hon hoac bang {{#limit}} ky tu',
    }),
    email: Joi.string().email().optional().messages({
      "string.base": "Email phai la chuoi",
      "string.emai": "Email khong dung",
    }),
    phone: Joi.string().min(10).max(11).optional().messages({
      "string.base": "So dien thoai phai la chuoi",
      "string.min": "So dien thoai lon hon hoac bang {{#limit}} ky tu",
      "string.max": "So dien thoai nho hon hoac bang {{#limit}} ky tu"
    }),
    avatar: Joi.string().optional().messages({
      "string.base": "Avatar phai la jpg",
    })
  })
)