import { Product } from "../../../models/Product.js";

export default class ProductManager {
  static #all = [];
  static #nextId = 0;

  constructor() {}

  create(title, price, stock, category, photo) {
    const id = this.#getId();
    const product = new Product(id, title, price, stock, category, photo);
    ProductManager.#all.push(product);
    return product;
  }

  #getId() {
    return (ProductManager.#nextId += 1);
  }

  readAll() {
    return ProductManager.#all;
  }
  readId(id) {
    return ProductManager.#all.find((p) => p.id === id);
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
