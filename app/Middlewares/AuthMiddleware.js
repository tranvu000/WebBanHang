import { responseError } from "../Common/helpers.js";
import { parserJWT } from "../Common/helpers.js";
import UserService from "../Service/UserService.js";

const authMiddleware = async (req, res, next) => {
  const checkToken = parserJWT(req.headers.authorization);

  if (!checkToken.success) {
    return res.status(401).json(responseError(
      new Error(checkToken.error), 
      401
    ))
  };

    const userService = new UserService();
    const user = await userService.show(checkToken.payload.id);

    if (!user) {
      return res.status(401).json(responseError(
        new Error('User khong ton tai'), 
        401
      ));
    }

    req.authUser = user;

    next();
}

export default authMiddleware;