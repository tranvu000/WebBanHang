import Joi from "joi";
import { baseJoiValidator } from "../BaseValidation.js";

export const changePasswordValidator = baseJoiValidator(
  Joi.object({
    password: Joi.string().min(8).required().messages({
      "string.base": "Password phai la chuoi",
      "string.min": "Password lon hon hoac bang {{#limit}} ky tu",
      "any.required": "Password khong duoc de trong",
    }),
  })
);