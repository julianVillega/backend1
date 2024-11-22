import MongoCrudControler from "./mongoCRUD.controler.js";
import cartsManager from "../../data/mongo/managers/cartsManager.js";

class CartsContrler extends MongoCrudControler {
  constructor() {
    super(cartsManager, "cart");
    this.read = this.read.bind(this);
    this.showCart = this.showCart.bind(this);
  }

  async read(req, res, next) {
    try {
      const { id } = req.params;
      const instance = await this.manager.read(id);
      if (instance) {
        return res.status(200).json({
          message: `fetched ${this.modelName} from user with id ${id} `,
          response: instance,
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

  async showCart(req, res, next) {
    try {
      const { id } = req.params;
      const cart = await this.manager.read(id);
      return res.render("cart.handlebars", { cart });
    } catch (error) {
      throw error;
    }
  }
}

const cartsControler = new CartsContrler();
export default cartsControler;
