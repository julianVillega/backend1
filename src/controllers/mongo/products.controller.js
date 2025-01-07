import MongoCrudController from "./mongoCRUD.controller.js";
import productsService from "../../services/products.service.js";

class ProductsController extends MongoCrudController {
  constructor() {
    super(productsService, "product");
    this.readAll = this.readAll.bind(this);
  }

  async readAll(req, res, next) {
    const { category, limit, page } = req.query;
    const instances = await productsService.readAll(
      category ? { category } : {},
      { limit, page }
    );
    if (instances.docs.length > 0) {
      return res.json200(
        instances,
        `fetched ${instances.docs.length} ${this.modelName}s`
      );
    } else {
      return res.json404([], `no ${this.modelName}s were found`);
    }
  }

}

const productsController = new ProductsController();
export default productsController;
