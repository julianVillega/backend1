class SessionsController {
  constructor() {
    this.register = this.register.bind(this);
  }
  register(req, res, next) {
    try {
      return res
        .status(201)
        .json({ message: "USER REGISTERED", response: req.user.id });
    } catch (error) {
      next(error);
    }
  }
}

const sessionsController = new SessionsController();
export default sessionsController;
