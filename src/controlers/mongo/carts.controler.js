import MongoCrudControler from "./mongoCRUD.controler.js";
import cartsManager from "../../data/mongo/managers/cartsManager.js";

class CartsContrler extends MongoCrudControler {
  constructor() {
    super(cartsManager, "cart");
  }
}

const cartsControler = new CartsContrler();
export default cartsControler;
