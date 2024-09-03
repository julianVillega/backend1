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
        console.log(`error creating product with arguments:`, arguments);
        reject(error);
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
        console.log("error reading products");
        reject(error);
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
        console.log(`error when reading product with id: ${id}`);
        reject(error);
      }
    });
    return result;
  }

  update({ id, ...rest }) {
    //find the product
    const product = this.readId(id);
    if (!product) {
      console.error(`update error, no products with id: ${id} were found`);
      return null;
    }
    try {
      //update the product fiels
      for (const [key, value] of Object.entries(rest)) {
        product[key] = value;
      }
      return product;
    } catch (error) {
      console.error(`Error updating product: ${error}`);
    }
  }

  destroy(id) {
    const product = this.readId(id);
    // delete the product if it exists and has not been deleted yet
    if (product && !product.deletiondDate) {
      product["deletiondDate"] = Date.now();
      return true;
    }
    return false;
  }
}
