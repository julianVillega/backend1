// products router
import { Router } from "express";
// import productsController from "../../controllers/products.controller.js";
import productsController from "../../controllers/mongo/products.controller.js";
import isValidProduct from "../../middlewares/isValidProduct.mid.js";
import setDefaultValues from "../../middlewares/setProductDefaultValues.mid.js";
import passportCb from "../../middlewares/passportCb.js";

const productsRouter = Router();

productsRouter.get("/", productsController.readAll);
productsRouter.get("/:id", productsController.read);
productsRouter.post(
  "/",
  isValidProduct,
  setDefaultValues,
  passportCb("online"),
  productsController.create
);
productsRouter.put(
  "/:id",
  isValidProduct,
  passportCb("online"),
  productsController.update
);
productsRouter.delete(
  "/:id",
  passportCb("online"),
  productsController.delete
);
export default productsRouter;
