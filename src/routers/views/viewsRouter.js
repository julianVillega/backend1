import { Router } from "express";
import productsControler from "../../controlers/products.controler.js";

const viewRouter = Router()
viewRouter.get('/', productsControler.showHome);
export default viewRouter;