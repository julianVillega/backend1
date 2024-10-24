import Cart from "../models/cart.model.js";
import MongoCrudManager from "./MongoCrudManager.js";

class CartsManager extends MongoCrudManager {
  constructor() {
    super(Cart);
  }
}

const cartsManager = new CartsManager();
export default cartsManager;
