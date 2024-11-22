// this is the api main router
import { Router } from "express";
import productsRouter from "./products.api.js";
import usersRouter from "./users.api.js";
import cartsRouter from "./carts.api.js";


// 1. create the api router
const apiRouter = Router();

// 2. add the routers for the different resources
apiRouter.use("/products", productsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/carts", cartsRouter)
//! to be implemented: apiRouter.use("/carts", cartsRouter);

// 3. export the router
export default apiRouter;
