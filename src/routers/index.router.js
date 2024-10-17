// this is the application main router
import { Router } from "express";
import apiRouter from "./api/index.api.js";
import viewRouter from "./views/viewsRouter.js";

// 1. create the router
const router = Router();

// 2. add api and views router
router.use("/api", apiRouter);

router.use("/", viewRouter);

// 3. export the router
export default router;
