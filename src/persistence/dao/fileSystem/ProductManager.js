import { Product } from "../../../models/Product.js";

export default class ProductManager {
  static #all = [];
  static #nextId = 0;

  constructor() {}

  create(title, price, stock, category, photo) {
    const result = new Promise((resolve, reject) => {
      try {
        const id = this.#getId();
        const product = new Product(id, title, price, stock, category, photo);
        ProductManager.#all.push(product);
        resolve(product);
      } catch (error) {
        reject(`Error at ProductManager.create: ${error}`);
      }
    });
    return result;
  }

  #getId() {
    return (ProductManager.#nextId += 1);
  }

  readAll() {
    const result = new Promise((resolve, reject) => {
      try {
        const products = ProductManager.#all;

        products.length != 0
          ? resolve(products)
          : reject("no products were found");
      } catch (error) {
        reject(`Error at ProductManager.readAll: ${error}`);
      }
    });
    return result;
  }

  readId(id) {
    const result = new Promise((resolve, reject) => {
      try {
        const product = ProductManager.#all.find((p) => p.id === id);
        product ? resolve(product) : reject(`product with id: ${id} not found`);
      } catch (error) {
        reject(`Error at ProductManager.readId: ${error}`);
      }
    });
    return result;
  }

  async update({ id, ...rest }) {
    try {
      const product = await this.readId(id);
      for (const [key, value] of Object.entries(rest)) {
        product[key] = value;
      }
      return product;
    } catch (error) {
      throw new Error(`Error at ProductManager.update(): ${error}`);
    }
  }

  async destroy(id) {
    try {
      const product = await this.readId(id);
      // delete the product if it has not been deleted yet
      if (!product.deletiondDate) {
        product["deletiondDate"] = Date.now();
        return true;
      }
      return false;
    } catch (error) {
      throw new Error(`Error at ProdutManager.destroy: ${error}`);
    }
  }
}
