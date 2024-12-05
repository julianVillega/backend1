import { Router } from "express";
import cartsController from "../../controllers/mongo/carts.controller.js";
import passportCb from "../../middlewares/passportCb.js";

const cartsRouter = Router();

cartsRouter.get(
  "/",
  passportCb("online"),
  cartsController.readAll
);
cartsRouter.get(
  "/:id",
  passportCb("online"),
  cartsController.read
);
cartsRouter.post(
  "/",
  passportCb("online"),
  cartsController.create
);
cartsRouter.put(
  "/:id",
  passportCb("online"),
  cartsController.update
);
cartsRouter.delete(
  "/:id",
  passportCb("online"),
  cartsController.delete
);

export default cartsRouter;
