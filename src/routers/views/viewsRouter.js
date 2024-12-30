import { Router } from "express";
//fs based controllers
// import productsController from "../../controllers/products.controller.js";
// import userController from "../../controllers/users.controller.js";

//mongo based controllers
import productsController from "../../controllers/mongo/products.controller.js";
import userController from "../../controllers/mongo/users.controller.js";
import cartsController from "../../controllers/mongo/carts.controller.js";
// middlewares
import isAuthenticated from "../../middlewares/isAuthenticated.mid.js";

const viewRouter = Router();
viewRouter.get("/users/login", userController.showLogin);
viewRouter.get("/users/register", userController.showRegister);
viewRouter.get("/users/verify/:id", userController.showVerify);
viewRouter.get("/users/:userId", isAuthenticated, userController.showUser);
viewRouter.get("/", productsController.showHome);
viewRouter.get("/products/:pid", productsController.showProductDetail);
viewRouter.get("/carts/:id", cartsController.showCart);
viewRouter.get(
  "/products/admin/:userId",
  isAuthenticated,
  productsController.showProductsAdminPanel
);
export default viewRouter;
