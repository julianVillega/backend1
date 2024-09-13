import { Product } from "../../../models/Product.js";
import fs from "fs";
import crypto from "crypto";

class ProductManager {
  static #all = [
    new Product(0, "default product 1", 100, 150, "category 1"),
    new Product(1, "default product 2", 200, 200, "category 2"),
    new Product(2, "default product 3", 300, 300, "category 3"),
  ];
  static #nextId = 3;

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
    // creates the products file if it doesn't exists
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
      // 1. validate fields
      if (Array.from(arguments).some((arg) => !arg)) {
        throw new Error("missing fields");
      }

      // 2. create the new product
      const productId = crypto.randomBytes(12).toString("hex");
      const newProduct = new Product(
        productId,
        title,
        price,
        stock,
        category,
        photo
      );

      // 3. update the products file
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

  #getId() {
    return (ProductManager.#nextId += 1);
  }

  async readAll(category) {
    // returns a list of all products in the products file, including deleted ones
    try {
      // 1. read all products from the products file
      const produtcsJson = await fs.promises.readFile(this.path, "utf-8");
      let parsedProdutcs = JSON.parse(produtcsJson);

      if (category) {
        parsedProdutcs = parsedProdutcs.filter(
          (product) => product.category === category
        );
      }
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

      // 2. update the products json file
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
      return true;
    } catch (error) {
      throw error;
    }
  }
}

const productsManager = new ProductManager(
  "./src/persistence/dao/fileSystem/products.json/"
);
export default productsManager;
