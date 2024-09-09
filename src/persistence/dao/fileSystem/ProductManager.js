import { Product } from "../../../models/Product.js";

export default class ProductManager {
  static #all = [
    new Product(0, "default product 1", 100, 150, "category 1"),
    new Product(1, "default product 2", 200, 200, "category 2"),
    new Product(2, "default product 3", 300, 300, "category 3"),
  ];
  static #nextId = 3;

  constructor() {}

  create(title, price, stock, category, photo) {
    try {
      const result = new Promise((resolve, reject) => {
        if(Array.from(arguments).some(arg => !arg)){
          reject("missing fields");
        }
        const id = this.#getId();
        const product = new Product(id, title, price, stock, category, photo);
        ProductManager.#all.push(product);
        resolve(product);
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  #getId() {
    return (ProductManager.#nextId += 1);
  }

  readAll() {
    try {
      const result = new Promise((resolve, reject) => {
        const products = ProductManager.#all.filter((p) => !p.deletiondDate);

        products.length != 0
          ? resolve(products)
          : reject("no products were found");
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  readId(id) {
    try {
      const result = new Promise((resolve, reject) => {
        const product = ProductManager.#all.find(
          (p) => p.id === id && !p.deletiondDate
        );
        product ? resolve(product) : reject(`product with id: ${id} not found`);
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  update({ id, ...rest }) {
    try {
      const result = new Promise(async (resolve, reject) => {
        try {
          const product = await this.readId(id);
          for (const [key, value] of Object.entries(rest)) {
            product[key] = value;
          }
          resolve(product);
        } catch (error) {
          reject(error);
        }
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  destroy(id) {
    try {
      const result = new Promise(async (resolve, reject) => {
        try {
          const product = await this.readId(id);
          product["deletiondDate"] = Date.now();
          resolve(true);
        } catch (error) {
          reject(error);
        }
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}
