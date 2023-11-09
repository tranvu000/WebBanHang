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
    response.errors = Object.values(errors.errors).map((error) => {
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

  const headerBase64 = Buffer.from(JSON.stringify(header)).toString("base64url");
  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = hashString(`${headerBase64}.${payloadBase64}`);

  return `${headerBase64}.${payloadBase64}.${signature}`;
};

export const parserJWT = (token) => {
  const response = {
    success : false,
  };

  if(!token || typeof token !== 'string') {
    response.error = "Token khong hop le";

    return response;
  };

  try {
    const [headerBase64, payloadBase64, signature] = token.split(" ")[1].split('.');
    const header = JSON.parse(Buffer.from(headerBase64, "base64").toString());
    const payload = JSON.parse(Buffer.from(payloadBase64, "base64").toString());

    if(hashString(`${headerBase64}.${payloadBase64}`, header.alg)  !== signature) {
      response.error = "Token khong dung";

      return response;
    };

    if (moment().unix() > payload.exp) {
      response.error = "Token het han";

      return response;
    }

    response.success = true;
    response.payload = payload;

    return response;
  } catch (e) {
    response.error = e.message;

    return response;
  }
};

export const parserJWTToken = (bearerToken, withBearerPrefix = true) => {
  const responseToken = {
    success: false,
  }

  if (!bearerToken) {
    return {...responseToken, errors: 'Token không được để trống!'};
  }

  try {
    let token = [];

    if (withBearerPrefix) {
      token = bearerToken.split(' ')[1].split('.');
    } else {
      token = bearerToken.split('.');
    }
    const base64Header = token[0];
    const base64Payload = token[1];
    const signature = token[2];
    const header = JSON.parse(Buffer.from(base64Header, 'base64').toString());

    if (hashHmacString(base64Header + "." + base64Payload, header.alg) !== signature) {

      return {...responseToken, errors: 'Token không đúng định dạng!'};
    }
    const payload = JSON.parse(Buffer.from(base64Payload, 'base64').toString());

    if (moment().unix() > payload.exp) {
      return {...responseToken, errors: 'Token đã hết hạn!'};
    }

    return {...responseToken, success: true, payload};
  } catch (e) {
    return {...responseToken, errors: e.message};
  }
}
