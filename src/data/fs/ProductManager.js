import { Product } from "../../models/Product.js";
import fs from "fs";
import crypto from "crypto";

class ProductManager {
  constructor(path) {
    this.path = path;
    this.exists();
  }

  async exists() {
    // creates the products file if it doesn't exists
    try {
      const fileExists = fs.existsSync(this.path);
      if (!fileExists) {
        await fs.promises.writeFile(this.path, JSON.stringify([]));
        console.log("products file created");
      } else {
        console.log("products file already exists");
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteAll() {
    // deletes all products, by ovewriting the products.json file with an empty array
    try {
      const fileExists = fs.existsSync(this.path);
      if (fileExists) {
        await fs.promises.writeFile(this.path, JSON.stringify([]));
        console.log("all products deleted");
      } else {
        console.log("products file doesn't exists");
      }
    } catch (error) {
      throw error;
    }
  }

  async create(title, price, stock, category, photo) {
    // creates a new product and saves it in the products file
    try {
      // 1. create the new product
      const productId = crypto.randomBytes(12).toString("hex");
      const newProduct = new Product(
        productId,
        title,
        price,
        stock,
        category,
        photo
      );

      // 2. update the products file
      const allProducts = await this.readAll();
      allProducts.push(newProduct);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(allProducts, null, 2)
      );

      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  async readAll(category) {
    try {
      // 1. read all products from the products file
      const produtcsJson = await fs.promises.readFile(this.path, "utf-8");
      let parsedProdutcs = JSON.parse(produtcsJson);

      // 2. filter products by category if one is provided
      if (category) {
        parsedProdutcs = parsedProdutcs.filter(
          (product) => product.category === category
        );
      }

      //return the products
      return parsedProdutcs;
    } catch (error) {
      throw error;
    }
  }

  async readId(id) {
    try {
      const allProducts = await this.readAll();
      const product = allProducts.find((p) => p.id === id);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async update({ id, ...rest }) {
    // updates a product in the products file.
    try {
      // 1. find the product
      const products = await this.readAll();
      const product = products.find((p) => p.id === id);
      if (!product) return null;

      // 2. update the fields
      for (const [key, value] of Object.entries(rest)) {
        product[key] = value;
      }

      // 3. update the products json file
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
      return product;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    // marks a product as deleted in the products file
    try {
      // 1. find the product
      let products = await this.readAll();
      const product = products.find((P) => P.id === id);

      // 2. remove the product if it exists
      if (!product) return false;
      products = products.filter((p) => p.id != id);

      // 3. update the products json file
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
      return true;
    } catch (error) {
      throw error;
    }
  }
}

const productsManager = new ProductManager(
  "./src/data/fs/files/products.json/"
);
export default productsManager;
