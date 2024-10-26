import { Router } from "express";
//fs based controllers
// import productsControler from "../../controlers/products.controler.js";
// import userControler from "../../controlers/users.controler.js";

//mongo based controllers
import productsControler from "../../controlers/mongo/products.controler.js";
import userControler from "../../controlers/mongo/users.controler.js";
import cartsControler from "../../controlers/mongo/carts.controler.js";
// middlewares
import isAuthenticated from "../../middlewares/isAuthenticated.mid.js";

const viewRouter = Router();
viewRouter.get("/users/login", userControler.showLogin);
viewRouter.get("/users/register", userControler.showRegister);
viewRouter.get("/users/:userId", isAuthenticated, userControler.showUser);
viewRouter.get("/", productsControler.showHome);
viewRouter.get("/products/:pid", productsControler.showProductDetail);
viewRouter.get("/cart/:id", cartsControler.showCart);
// viewRouter.get(
//   "/products/admin/:userId",
//   isAuthenticated,
//   productsControler.showProductsAdminPannel
// );
export default viewRouter;
