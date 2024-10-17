import { Router } from "express";
import userControler from "../../controlers/users.controler.js";
import isValidUser from "../../middlewares/isValidUser.mid.js";
import setDefaultUserValues from "../../middlewares/setUserDefaultValues.mid.js";

const usersRouter = Router();

usersRouter.get("/", userControler.readAll);
usersRouter.get("/logout/:id", userControler.logout);
usersRouter.get("/:id", userControler.readId);
usersRouter.post("/login", userControler.login);
usersRouter.post("/", isValidUser, setDefaultUserValues, userControler.create);
usersRouter.put("/:id", isValidUser, userControler.update);
usersRouter.delete("/:id", userControler.delete);

export default usersRouter;
