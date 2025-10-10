
import userController from "../../controllers/mongo/users.controller.js";
import validateUpdate from "../../middlewares/validations/users.update.mid.js";
import validateCreation from "../../middlewares/validations/users.creation.mid.js";
import setDefaultUserValues from "../../middlewares/setUserDefaultValues.mid.js";
import CustomRouter from "../customRouter.js";
import isSameUser from "../../middlewares/isSameUser.mid.js";

class UsersRouter extends CustomRouter {
  constructor() {
    super();
    this.create("/", ["ADMIN"], validateCreation, setDefaultUserValues, userController.create);
    this.create("/verify/",["PUBLIC"], userController.verify)
    this.read("/", ["ADMIN"], userController.readAll);
    this.read("/:id",["USER","ADMIN"], isSameUser, userController.read)
    this.update("/:id", ["USER", "ADMIN"], isSameUser ,validateUpdate, userController.update)
    this.destroy("/:id",["USER", "ADMIN"], isSameUser, userController.delete)
  }
}
const usersRouter = new UsersRouter()._router;
export default usersRouter;
