import MongoCrudManager from "./MongoCrudManager.js";
import Product from "../models/product.model.js";

class ProductsManager extends MongoCrudManager {
  constructor() {
    super(Product);
  }

  async readAll(filter, pageAndLimit) {
    try {
      const instances = await this.model.paginate(filter, {...pageAndLimit, lean:true});
      return instances;
    } catch (error) {
      throw error;
    }
  }
}

const productsManager = new ProductsManager();
export default productsManager;
