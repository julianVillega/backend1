import productsManager from "../../data/mongo/managers/productsManager.js";
import MongoCrudController from "./mongoCRUD.controller.js";
import productsService from "../../services/products.service.js";

class ProductsController extends MongoCrudController {
  constructor() {
    super(productsManager, "product");
    this.readAll = this.readAll.bind(this);
    this.showHome = this.showHome.bind(this);
    this.showProductDetail = this.showProductDetail.bind(this);
    this.showProductsAdminPanel = this.showProductsAdminPanel.bind(this);
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

  async showHome(req, res, next) {
    try {
      const { category, limit, page } = req.query;
      const productsAndLinks = await productsService.showHome(category, limit, page)
      return res.render("home.handlebars", productsAndLinks);
    } catch (error) {
      next(error);
    }
  }

  async showProductDetail(req, res, next) {
    try {
      const { pid } = req.params;
      const product = await productsService.showProductDetail(pid);
      return res.render("productDetail.handlebars", { product });
    } catch (error) {
      next(error);
    }
  }

  async showProductsAdminPanel(req, res, next) {
    try {
      const { category, limit, page } = req.query;
      const { userId } = req.params;
      console.log(req.user)
      const productsAndLinks = await productsService.showProductsAdminPanel(category, limit, page, userId)

      return res.render("productsAdmin.handlebars", productsAndLinks);
    } catch (error) {
      next(error);
    }
  }
}

const productsController = new ProductsController();
export default productsController;
