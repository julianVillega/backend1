import productsManager from "../data/fs/ProductManager.js";
class ProductsController {
  constructor() {}

  async readAll(req, res, next) {
    try {
      const { category } = req.query;
      const products = await productsManager.readAll(category);
      if (products.length > 0) {
        return res.status(200).json({
          message: `fetched ${products.length} products`,
          response: products,
        });
      } else {
        const error = new Error(`no products were found`);
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  }

  async read(req, res, next) {
    try {
      const { id } = req.params;
      const product = await productsManager.readId(id);
      if (product) {
        return res.status(200).json({
          message: `fetched product with id ${product.id} `,
          response: product,
        });
      } else {
        const error = new Error(`product with id ${id} was not found`);
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  }

  async create(req, res, next) {
    try {
      const { title, price, stock, category, photo } = req.body;
      const product = await productsManager.create(
        title,
        price,
        stock,
        category,
        photo
      );
      return res.status(201).json({
        message: `created product with id ${product.id}`,
        response: product.id,
      });
    } catch (error) {
      return next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;
      const product = await productsManager.update({ id, ...data });
      if (product) {
        return res.status(200).json({
          message: `updated product with id ${id}`,
          response: product,
        });
      } else {
        const error = new Error(`product with id ${id} was not found`);
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deletionResult = await productsManager.destroy(id);
      if (deletionResult) {
        return res.status(200).json({
          message: `product with id ${id} was deleted`,
          response: deletionResult,
        });
      } else {
        const error = new Error(`product with id ${id} was not found`);
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  }

  async showHome(req, res, next) {
    try {
      const products = await productsManager.readAll();
      return res.render("home.handlebars", {products});
    } catch (error) {
      next(error);
    }
  }
  
  async showProductsAdminPannel(req, res, next) {
    try {
      const products = await productsManager.readAll();
      return res.render("productsAdmin.handlebars", {products});
    } catch (error) {
      next(error);
    }
  }
}

const productsControler = new ProductsController();
export default productsControler;
