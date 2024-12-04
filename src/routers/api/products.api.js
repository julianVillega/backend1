// products router
import { Router } from "express";
// import productsController from "../../controllers/products.controller.js";
import productsController from "../../controllers/mongo/products.controller.js";
import isValidProduct from "../../middlewares/isValidProduct.mid.js";
import setDefaultValues from "../../middlewares/setProductDefaultValues.mid.js";
import passport from "../../middlewares/passportStrategies.mid.js";

const productsRouter = Router();

productsRouter.get("/", productsController.readAll);
productsRouter.get("/:id", productsController.read);
productsRouter.post(
  "/",
  isValidProduct,
  setDefaultValues,
  passport.authenticate("online", { session: false }),
  productsController.create
);
productsRouter.put(
  "/:id",
  isValidProduct,
  passport.authenticate("online", { session: false }),
  productsController.update
);
productsRouter.delete(
  "/:id",
  passport.authenticate("online", { session: false }),
  productsController.delete
);
export default productsRouter;
