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
      const instances = await this.manager.readAll(
        category ? { category } : {},
        { limit, page }
      );
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
        category ? { category } : {},
        { page, limit: limit || 5 }
      );
      const pagesLinkArray = Array.from(
        { length: products.totalPages },
        (_, i) => {
          return {
            link: `http://localhost:8000/?page=${i + 1}&limit=${limit}${
              category ? `&category=${category}` : ""
            }`,
            pageNumber: i + 1,
          };
        }
      );
      const prevPageLink = products.hasPrevPage
        ? `http://localhost:8000/?page=${products.prevPage}&limit=${limit}${
            category ? `&category=${category}` : ""
          }`
        : "";
      const nextPageLink = products.hasNextPage
        ? `http://localhost:8000/?page=${products.nextPage}&limit=${limit}${
            category ? `&category=${category}` : ""
          }`
        : "";

      return res.render("home.handlebars", { products, pagesLinkArray, prevPageLink, nextPageLink });
    } catch (error) {
      next(error);
    }
  }
}

const productsControler = new ProductsController();
export default productsControler;
