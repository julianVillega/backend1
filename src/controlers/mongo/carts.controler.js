import MongoCrudControler from "./mongoCRUD.controler.js";
import cartsManager from "../../data/mongo/managers/cartsManager.js";

class CartsContrler extends MongoCrudControler {
  constructor() {
    super(cartsManager, "cart");
    this.read = this.read.bind(this)
  }

  async read(req, res, next) {
    try {
      const { id } = req.params;
      const instance = await this.manager.read(id);
      if (instance[0]) {
        return res.status(200).json({
          message: `fetched ${this.modelName} from user with id ${id} `,
          response: instance[0],
        });
      } else {
        const error = new Error(
          `${this.modelName} for user with id ${id} was not found`
        );
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  }

}

const cartsControler = new CartsContrler();
export default cartsControler;
