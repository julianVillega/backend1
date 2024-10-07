import { Router } from "express";
import productsControler from "../../controlers/products.controler.js";
import userControler from "../../controlers/users.controler.js";
import isAuthenticated from "../../middlewares/isAuthenticated.mid.js";

const viewRouter = Router()
viewRouter.get('/users/login', userControler.showLogin);
viewRouter.get('/users/:userId', isAuthenticated ,userControler.showUser);
viewRouter.get('/', productsControler.showHome);
viewRouter.get('/products/admin/:userId', isAuthenticated ,productsControler.showProductsAdminPannel);
export default viewRouter;