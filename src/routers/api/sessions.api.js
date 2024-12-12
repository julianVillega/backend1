import { Router } from "express";
import sessionsController from "../../controllers/mongo/sessions.controller.js";
import validateCreation from "../../middlewares/validations/users.creation.mid.js";
import passportCb from "../../middlewares/passportCb.js";
import CustomRouter from "../customRouter.js";
// const sessionsRouter = Router();

// sessionsRouter.post(
//   "/login",
//   passportCb("login"),
//   sessionsController.login
// );

// sessionsRouter.get(
//   "/logout",
//   passportCb("logout"),
//   sessionsController.logout
// );

// export default sessionsRouter;

class SessionRouter extends CustomRouter {
  constructor() {
    super();
    this.create(
      "/register",
      ["PUBLIC"],
      validateCreation,
      passportCb("register"),
      sessionsController.register
    );
  }
}

export default new SessionRouter();
