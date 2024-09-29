// this is the application main router
import { Router } from "express";
import apiRouter from "./api/index.api.js";

// 1. create the router
const router = Router();

// 2. add api and views router
router.use("/api", apiRouter);

//! to be implemented:  router.use("/", viewRouter);

// 3. export the router
export default router;
