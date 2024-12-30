import productsManager from "../data/mongo/managers/productsManager.js";
import MongoCrudService from "./mongoCrudService.js";
class ProductsService extends MongoCrudService {
  constructor() {
    super(productsManager);
  }

  async readAll(category, limit, page) {
    const instances = await this.manager.readAll(category, {
      limit,
      page,
    });
    return instances;
  }

  async showHome(category, limit, page) {
    const products = await this.manager.readAll(category, {
      page,
      limit: limit || 5,
    });

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
      ? `http://localhost:8000/?page=${products.prevPage}&limit=${limit || 5}${
          category ? `&category=${category}` : ""
        }`
      : "";
    const nextPageLink = products.hasNextPage
      ? `http://localhost:8000/?page=${products.nextPage}&limit=${limit || 5}${
          category ? `&category=${category}` : ""
        }`
      : "";
    return {
      products,
      pagesLinkArray,
      prevPageLink,
      nextPageLink,
    };
  }

  async showProductDetail(pid) {
    const product = await this.manager.read(pid);
    product.id = product._id.toString();
    return product;
  }

  async showProductsAdminPanel(category, limit, page, userId) {
    const products = await this.manager.readAll(category, {
      page,
      limit: limit || 5,
    });
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
    return { products, pagesLinkArray, prevPageLink, nextPageLink };
  }
}

export default new ProductsService();
