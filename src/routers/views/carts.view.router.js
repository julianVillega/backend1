import CustomRouter from "../customRouter.js";
import viewsController from "../../controllers/views.controller.js";
import isSameUser from "../../middlewares/isSameUser.mid.js";

class CartsRouter extends CustomRouter {
  constructor() {
    super();
    this.read("/:id", ["USER", "ADMIN"], isSameUser, viewsController.showCart);
  }
}

export default new CartsRouter()._router;
