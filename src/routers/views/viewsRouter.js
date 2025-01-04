import { Router } from "express";

//mongo based controllers
import cartsController from "../../controllers/mongo/carts.controller.js";
// View routers
import usersRouter from "./users.view.api.js";
import productsRouter from "./products.view.api.js";

const viewRouter = Router();

viewRouter.use("/users", usersRouter);
viewRouter.use("/",productsRouter);
viewRouter.get("/carts/:id", cartsController.showCart);
export default viewRouter;
