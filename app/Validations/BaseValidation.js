import { responseError } from "../Common/helpers.js";

export const baseJoiValidator = (schema, dataType) => {
  return (req, res, next) => {
    let data;
    switch (dataType) {
      case "query":
        data = req.query;
        break;
      case "params":
        data = req.params;
        break;
      default:
        data = req.body;
    }

    const result = schema.validate(data);

    if (result.error) {
      return res.status(422).json(responseError(result.error, 422));
    }

    next();
  };
};
