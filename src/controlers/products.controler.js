import productsManager from "../persistence/dao/fileSystem/ProductManager.js";
class ProductsControler {
  constructor() {}

  async readAll(req, res) {
    try {
      const products = await productsManager.readAll();
      if (products.length > 0) {
        return res.status(200).json({
          message: `fetched ${products.length} products`,
          response: products,
        });
      } else {
        return res.status(404).json({
          message: `no products were found`,
        });
      }
    } catch (error) {
      const { statusCode, message } = error;
      return res
        .status(statusCode || 500)
        .json({ message: message || "FATAL ERROR" });
    }
  }

  async read(req, res) {
    try {
      const { id } = req.params;
      const product = await productsManager.readId(id);
      if (product) {
        return res.status(200).json({
          message: `fetched product with id ${product.id} `,
          response: product,
        });
      } else {
        return res.status(404).json({
          message: `product with id ${id} was not found`,
        });
      }
    } catch (error) {
      const { statusCode, message } = error;
      return res
        .status(statusCode || 500)
        .json({ message: message || "FATAL ERROR" });
    }
  }

  async create(req, res) {
    try {
      const { title, price, stock, category, photo } = req.body;
      const productId = await productsManager.create(
        title,
        price,
        stock,
        category,
        photo
      );
      return res.status(201).json({
        message: `created product with id ${productId.id}`,
        response: productId,
      });
    } catch (error) {
      const { statusCode, message } = error;
      return res
        .status(statusCode || 500)
        .json({ message: message || "FATAL ERROR" });
    }
  }

  async update(req, res) {
    try {
      const {id} = req.params
      const data = req.body;
      const product = await productsManager.update({id, ...data});
      if (product) {
        return res.status(200).json({
          message: `updated product with id ${id}`,
          response: product,
        });
      } else {
        return res.status(404).json({
          message: `product with id ${id} was not found`,
          response: product,
        });
      }
    } catch (error) {
      const { statusCode, message } = error;
      return res
        .status(statusCode || 500)
        .json({ message: message || "FATAL ERROR" });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletionResult = await productsManager.destroy(id);
      if (deletionResult) {
        return res.status(200).json({
          message: `product with id ${id} was deleted`,
          response: deletionResult,
        });
      } else {
        return res.status(404).json({
          message: `product with id ${id} was not found`,
          response: deletionResult,
        });
      }
    } catch (error) {
      const { statusCode, message } = error;
      return res
        .status(statusCode || 500)
        .json({ message: message || "FATAL ERROR" });
    }
  }
}

const productsControler = new ProductsControler();
export default productsControler;
