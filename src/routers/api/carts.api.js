import CustomRouter from "../customRouter.js";
import cartsController from "../../controllers/mongo/carts.controller.js";
import passportCb from "../../middlewares/passportCb.js";

class cartsRouter extends CustomRouter {
  constructor(parameters) {
    super();
    this.read(
      "/",
      ["ADMIN"],
      passportCb("online"),
      cartsController.readAll
    );
    this.read(
      "/:id",
      ["USER"],
      passportCb("online"),
      cartsController.read
    );
    this.create(
      "/",
      ["USER"],
      passportCb("online"),
      cartsController.create
    );
    this.update(
      "/",
      ["USER"],
      passportCb("online"),
      cartsController.update
    );
    this.destroy(
      "/:id",
      ["USER"],
      passportCb("online"),
      cartsController.delete
    );
  }
}

export default new cartsRouter()._router;
