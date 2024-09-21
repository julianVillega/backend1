import { Router } from "express";
import userControler from "../../controlers/users.controler.js";

const usersRouter = Router();

usersRouter.get("/", userControler.readAll);
usersRouter.get("/:id", userControler.readId);
usersRouter.post("/", userControler.create);
usersRouter.put("/:id", userControler.update);
usersRouter.delete("/:id", userControler.delete);

export default usersRouter;
