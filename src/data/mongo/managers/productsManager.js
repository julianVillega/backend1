import MongoCrudManager from "./MongoCrudManager.js";
import Product from "../models/product.model.js";

const productsManager = new MongoCrudManager(Product);
export default productsManager;