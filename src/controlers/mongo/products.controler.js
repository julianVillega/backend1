import productsManager from "../../data/mongo/managers/productsManager.js";
import MongoCrudControler from "./mongoCRUD.controler.js";

class ProductsController extends MongoCrudControler {
  constructor() {
    super(productsManager, "product");
    this.readAll = this.readAll.bind(this);
    this.showHome = this.showHome.bind(this);
  }

  async readAll(req, res, next) {
    try {
      const { category, limit, page } = req.query;
      const instances = await this.manager.readAll(category ? { category }:{}, {limit, page});
      if (instances.docs.length > 0) {
        return res.status(200).json({
          message: `fetched ${instances.docs.length} ${this.modelName}s`,
          response: instances,
        });
      } else {
        const error = new Error(`no ${this.modelName}s were found`);
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  }

  async showHome(req, res, next) {
    try {
      const { category, limit, page } = req.query;
      const products = await this.manager.readAll(
        category ? { category }:{},
        { page, limit }
      );
      // const products = PaginatedProducts.docs;
      console.log(category, limit, page);
      return res.render("home.handlebars", { products });
    } catch (error) {
      next(error);
    }
  }
}

const productsControler = new ProductsController();
export default productsControler;
