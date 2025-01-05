import CustomRouter from "../customRouter.js";
import productsController from "../../controllers/mongo/products.controller.js";

class ProductsRouter extends CustomRouter {
  constructor() {
    super();
    this.read("/", ["PUBLIC"], productsController.showHome);
    this.read(
      "/products/:pid",
      ["PUBLIC"],
      productsController.showProductDetail
    );
    this.read(
      "/products/admin/:userId",
      ["ADMIN"],
      productsController.showProductsAdminPanel
    );
  }
}

export default new ProductsRouter()._router;
