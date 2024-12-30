import MongoCrudController from "./mongoCRUD.controller.js";
import cartsService from "../../services/carts.service.js";

class CartsController extends MongoCrudController {
  constructor() {
    super(cartsService, "cart");
    this.read = this.read.bind(this);
    this.showCart = this.showCart.bind(this);
  }

  async read(req, res) {
    const { id } = req.params;
    const instance = await cartsService.read(id);
    return instance ? 
      res.json200(instance, `fetched ${this.modelName} from user with id ${id}`) 
      :
      res.json404({}, `${this.modelName} for user with id ${id} was not found`)
  }

  async showCart(req, res, next) {
    try {
      const { id } = req.params;
      const cart = await cartsService.read(id);
      return res.render("cart.handlebars", { cart });
    } catch (error) {
      throw error;
    }
  }
}

const cartsController = new CartsController();
export default cartsController;