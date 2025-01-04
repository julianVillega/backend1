import CustomRouter from "../customRouter.js";
import usersController from "../../controllers/mongo/users.controller.js";

class UsersRouter extends CustomRouter {
  constructor() {
    super();
    this.read("/login", ["PUBLIC"],usersController.showLogin);
    this.read("/register",["PUBLIC"], usersController.showRegister);
    this.read("/verify/:id",["PUBLIC"], usersController.showVerify);
    this.read("/:userId", ["PUBLIC"], usersController.showUser);
  }
}

export default new UsersRouter()._router;
