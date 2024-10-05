import { Router } from "express";
import productsControler from "../../controlers/products.controler.js";
import userControler from "../../controlers/users.controler.js";

const viewRouter = Router()
viewRouter.get('/', productsControler.showHome);
viewRouter.get('/products/admin', productsControler.showProductsAdminPannel);
viewRouter.get('/users/login', userControler.showLogin);
viewRouter.get('/users/:userId', userControler.showUser);
export default viewRouter;