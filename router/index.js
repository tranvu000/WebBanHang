import authRouter from "./Admin/auth.js";
import profileUserRouter from "./Admin/profileUser.js";
import adminUserRouter from "./Admin/user.js";
import categoryRouter from "./Admin/category.js";
import brandRouter from "./Admin/brand.js";
import productRouter from "./Admin/product.js";

const router = (app) => {
  adminUserRouter(app);
  authRouter(app);
  profileUserRouter(app);
  categoryRouter(app);
  brandRouter(app);
  productRouter(app)
}

export default router;