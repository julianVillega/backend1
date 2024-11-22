import productsManager from "../../data/mongo/managers/productsManager.js";
import MongoCrudController from "./mongoCRUD.controller.js";

class ProductsController extends MongoCrudController {
  constructor() {
    super(productsManager, "product");
    this.readAll = this.readAll.bind(this);
    this.showHome = this.showHome.bind(this);
    this.showProductDetail = this.showProductDetail.bind(this);
    this.showProductsAdminPanel = this.showProductsAdminPanel.bind(this);
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
            link: `http://localhost:8000/?page=${i + 1}&limit=${limit || 5}${
              category ? `&category=${category}` : ""
            }`,
            pageNumber: i + 1,
          };
        }
      );
      const prevPageLink = products.hasPrevPage
        ? `http://localhost:8000/?page=${products.prevPage}&limit=${
            limit || 5
          }${category ? `&category=${category}` : ""}`
        : "";
      const nextPageLink = products.hasNextPage
        ? `http://localhost:8000/?page=${products.nextPage}&limit=${
            limit || 5
          }${category ? `&category=${category}` : ""}`
        : "";

      return res.render("home.handlebars", {
        products,
        pagesLinkArray,
        prevPageLink,
        nextPageLink,
      });
    } catch (error) {
      next(error);
    }
  }

  async showProductDetail(req, res, next) {
    try {
      const { pid } = req.params;
      const product = await this.manager.read(pid);
      product.id = product._id.toString();
      return res.render("productDetail.handlebars", { product });
    } catch (error) {
      next(error);
    }
  }

  async showProductsAdminPanel(req, res, next) {
    try {
      const { category, limit, page } = req.query;
      const { userId } = req.params;
      const products = await this.manager.readAll(
        category ? { category } : {},
        { page, limit: limit || 5 }
      );
      const pagesLinkArray = Array.from(
        { length: products.totalPages },
        (_, i) => {
          return {
            link: `http://localhost:8000/products/admin/${userId}?page=${
              i + 1
            }&limit=${limit || 5}${category ? `&category=${category}` : ""}`,
            pageNumber: i + 1,
          };
        }
      );
      const prevPageLink = products.hasPrevPage
        ? `http://localhost:8000/products/admin/${userId}?page=${
            products.prevPage
          }&limit=${limit || 5}${category ? `&category=${category}` : ""}`
        : "";
      const nextPageLink = products.hasNextPage
        ? `http://localhost:8000/products/admin/${userId}?page=${
            products.nextPage
          }&limit=${limit || 5}${category ? `&category=${category}` : ""}`
        : "";

      return res.render("productsAdmin.handlebars", {
        products,
        pagesLinkArray,
        prevPageLink,
        nextPageLink,
      });
    } catch (error) {
      next(error);
    }
  }
}

const productsController = new ProductsController();
export default productsController;
