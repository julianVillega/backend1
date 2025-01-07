import CustomRouter from "../customRouter.js";
import viewsController from "../../controllers/views.controller.js";

class UsersRouter extends CustomRouter {
  constructor() {
    super();
    this.read("/login", ["PUBLIC"],viewsController.showLogin);
    this.read("/register",["PUBLIC"], viewsController.showRegister);
    this.read("/verify/:id",["PUBLIC"], viewsController.showVerify);
    this.read("/:userId", ["PUBLIC"], viewsController.showUser);
  }
}

export default new UsersRouter()._router;
