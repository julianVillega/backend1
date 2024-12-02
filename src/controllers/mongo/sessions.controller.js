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

  login(req, res, next){
    try {
      const user = req.user
      return res.status(200)
      .cookie("token", user.token, { maxAge : 3600, signed: true, httpOnly:true})
      .json({message: "login successful", response: user.id})
    } catch (error) {
      next(error)
    }
  }
}

const sessionsController = new SessionsController();
export default sessionsController;
