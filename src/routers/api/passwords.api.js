import CustomRouter from "../customRouter.js";
import passwordsController from "../../controllers/mongo/passwords.controller.js";

class PasswordsRouter extends CustomRouter {
  constructor() {
    super();
    this.create("/", ["PUBLIC"], passwordsController.sendRecoveryCode);
    this.create("/reset", ["PUBLIC"], passwordsController.updatePassword);
  }
}

export default new PasswordsRouter()._router;
