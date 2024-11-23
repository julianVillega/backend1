import { Router } from "express";
import userController from "../../controllers/mongo/users.controller.js";
// import userController from "../../controllers/users.controller.js";
import validateCreation from "../../middlewares/validations/users.creation.mid.js";
import validateUpdate from "../../middlewares/validations/users.update.mid.js";
import setDefaultUserValues from "../../middlewares/setUserDefaultValues.mid.js";

const usersRouter = Router();

usersRouter.get("/", userController.readAll);
usersRouter.get("/logout/:id", userController.logout);
usersRouter.get("/:id", userController.read);
usersRouter.post("/login", userController.login);
usersRouter.post("/", validateCreation, setDefaultUserValues, userController.create);
usersRouter.put("/:id", validateUpdate , userController.update);
usersRouter.delete("/:id", userController.delete);

export default usersRouter;
