
import { Router } from "express";
import productsController from "../../controllers/mongo/products.controller.js";
import isValidProduct from "../../middlewares/isValidProduct.mid.js";
import setDefaultValues from "../../middlewares/setProductDefaultValues.mid.js";
import passportCb from "../../middlewares/passportCb.js";
import CustomRouter from "../customRouter.js";


class ProductsRouter extends CustomRouter {
  constructor() {
    super();
    this.read("/", ["PUBLIC"], productsController.readAll);
    this.read("/:id", ["PUBLIC"], productsController.read);
    this.create(
      "/",
      ["ADMIN"],
      isValidProduct,
      setDefaultValues,
      passportCb("online"),
      productsController.create
    );
    this.update(
      "/:id",
      ["ADMIN"],
      isValidProduct,
      passportCb("online"),
      productsController.update
    );
    this.destroy(
      "/:id",
      ["ADMIN"],
      passportCb("online"),
      productsController.delete
    );
  }
}
export default new ProductsRouter()._router;

