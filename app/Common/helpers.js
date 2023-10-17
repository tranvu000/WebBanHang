import crypto from "node:crypto";
import moment from "moment";
import { Buffer } from "node:buffer";

export const responseSuccess = (data, status = 200, message = "") => {
  return {
    status,
    time_current: moment().format("YYYY-MM-DD hh:mm:ss"),
    data,
    message,
  };
};

export const responseError = (errors, status = 500) => {
  const response = {
    status,
    time_current: moment().format("YYYY-MM-DD hh:mm:ss"),
    errors: [],
    message: errors.message || "Internal Error",
  };

  if (errors.errors) {
    response.errors = object.values(errors.errors).map((error) => {
      return {
        [error.path]: {
          value: error.value,
          message: error.message,
        },
      };
    });
  }
  return response;
};

export const hashString = (input, algorithm = "sha512") => {
  return crypto
    .createHmac(algorithm, process.env.PRIVATE_KEY)
    .update(input)
    .digest("hex");
};

export const generateJWT = (
  user,
  exp = moment().add(1, "months").unix(),
  algorithm = "sha512"
) => {
  const header = {
    alg: algorithm,
    type: "JWT",
  };

  const payload = {
    id: user._id,
    username: user.username,
    iat: moment().unix(),
    exp,
  };

  const headerBase64 = Buffer.from(JSON.stringify(header)).toString(
    "base64url"
  );
  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString(
    "base64url"
  );
  const signature = hashString(`${headerBase64}.${payloadBase64}`);

  return `${headerBase64}.${payloadBase64}.${signature}`;
};
