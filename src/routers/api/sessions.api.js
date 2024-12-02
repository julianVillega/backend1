import { Router } from "express";
import sessionsController from "../../controllers/mongo/sessions.controller.js";
import validateCreation from "../../middlewares/validations/users.creation.mid.js";
import passport from "../../middlewares/passportStrategies.mid.js";
const sessionsRouter = Router();

sessionsRouter.post(
  "/register",
  validateCreation,
  passport.authenticate("register", { session: false }),
  sessionsController.register
);
sessionsRouter.post(
  "/login",
  passport.authenticate("login", { session: false }),
  sessionsController.login
);

sessionsRouter.get(
  "/logout",
  (req, res, next) => {
    req.body.email = "asdasd";
    req.body.password = "asdasd";
    next();
  },
  passport.authenticate("logout", { session: false }),
  sessionsController.logout
);

export default sessionsRouter;
