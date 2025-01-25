import { Router } from "express";

// View routers
import usersRouter from "./users.view.api.js";
import productsRouter from "./products.view.api.js";
import cartsRouter from "./carts.view.router.js";

const viewRouter = Router();

viewRouter.use("/users", usersRouter);
viewRouter.use("/",productsRouter);
viewRouter.use("/carts", cartsRouter);
=======
import productsControler from "../../controlers/products.controler.js";
import userControler from "../../controlers/users.controler.js";
import isAuthenticated from "../../middlewares/isAuthenticated.mid.js";

const viewRouter = Router();
viewRouter.get("/users/login", userControler.showLogin);
viewRouter.get("/users/register", userControler.showRegister);
viewRouter.get("/users/:userId", isAuthenticated, userControler.showUser);
viewRouter.get("/", productsControler.showHome);
viewRouter.get(
  "/products/admin/:userId",
  isAuthenticated,
  productsControler.showProductsAdminPannel
);
export default viewRouter;
