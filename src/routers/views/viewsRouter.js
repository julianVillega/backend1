import { Router } from "express";

// View routers
import usersRouter from "./users.view.api.js";
import productsRouter from "./products.view.api.js";
import cartsRouter from "./carts.view.router.js";

const viewRouter = Router();

viewRouter.use("/users", usersRouter);
viewRouter.use("/",productsRouter);
viewRouter.use("/carts", cartsRouter);
export default viewRouter;
