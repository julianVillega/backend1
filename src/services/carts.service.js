import cartsManager from "../data/mongo/managers/cartsManager.js";
import MongoCrudService from "./mongoCrudService.js";
class CartsService extends MongoCrudService {
  constructor() {
    super(cartsManager);
  }
}

export default new CartsService();
