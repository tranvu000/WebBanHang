import authRouter from "./Admin/auth.js";
import adminUserRouter from "./Admin/user.js";

const router = (app) => {
  adminUserRouter(app);
  authRouter(app);
}

export default router;