import { Router } from "express";

//mongo based controllers
import productsController from "../../controllers/mongo/products.controller.js";
import cartsController from "../../controllers/mongo/carts.controller.js";
// middlewares
import isAuthenticated from "../../middlewares/isAuthenticated.mid.js";
import usersRouter from "./users.view.api.js";

const viewRouter = Router();

viewRouter.use("/users",usersRouter);
viewRouter.get("/", productsController.showHome);
viewRouter.get("/products/:pid", productsController.showProductDetail);
viewRouter.get("/carts/:id", cartsController.showCart);
viewRouter.get(
  "/products/admin/:userId",
  isAuthenticated,
  productsController.showProductsAdminPanel
);
export default viewRouter;
