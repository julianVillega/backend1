import CustomRouter from "../customRouter.js";
import viewsController from "../../controllers/views.controller.js";

class ProductsRouter extends CustomRouter {
  constructor() {
    super();
    this.read("/", ["PUBLIC"], viewsController.showHome);
    this.read(
      "/products/:pid",
      ["PUBLIC"],
      viewsController.showProductDetail
    );
    this.read(
      "/products/admin/:userId",
      ["ADMIN"],
      viewsController.showProductsAdminPanel
    );
  }
}

export default new ProductsRouter()._router;
