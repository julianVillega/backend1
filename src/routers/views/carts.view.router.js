import CustomRouter from "../customRouter.js";
import cartsController from "../../controllers/mongo/carts.controller.js";
import isSameUser from "../../middlewares/isSameUser.mid.js";

class CartsRouter extends CustomRouter {
  constructor() {
    super();
    this.read("/:id", ["USER", "ADMIN"], isSameUser, cartsController.showCart);
  }
}

export default new CartsRouter()._router;
