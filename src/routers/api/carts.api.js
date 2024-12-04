import { Router } from "express";
import cartsController from "../../controllers/mongo/carts.controller.js";
import passport from "../../middlewares/passportStrategies.mid.js";

const cartsRouter = Router();

cartsRouter.get(
  "/",
  passport.authenticate("online", { session: false }),
  cartsController.readAll
);
cartsRouter.get(
  "/:id",
  passport.authenticate("online", { session: false }),
  cartsController.read
);
cartsRouter.post(
  "/",
  passport.authenticate("online", { session: false }),
  cartsController.create
);
cartsRouter.put(
  "/:id",
  passport.authenticate("online", { session: false }),
  cartsController.update
);
cartsRouter.delete(
  "/:id",
  passport.authenticate("online", { session: false }),
  cartsController.delete
);

export default cartsRouter;
