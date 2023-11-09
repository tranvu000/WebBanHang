import authAdminRouter from "./Admin/auth.js";
import profileAdminRouter from "./Admin/profile.js";
import adminUserRouter from "./Admin/user.js";
import categoryRouter from "./Admin/category.js";
import brandRouter from "./Admin/brand.js";
import productAdminRouter from "./Admin/product.js";

import authRouter from "./User/auth.js";
import productRouter from "./User/product.js";
import profileRouter from "./User/profile.js";
import testRouter from "./testfirebase.js";

const router = (app) => {
  adminUserRouter(app);
  authAdminRouter(app);
  profileAdminRouter(app);
  categoryRouter(app);
  brandRouter(app);
  productAdminRouter(app);

  authRouter(app);
  productRouter(app);
  profileRouter(app);

  testRouter(app);
}

export default router;