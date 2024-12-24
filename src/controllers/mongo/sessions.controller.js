class SessionsController {
  constructor() {
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  register(req, res, next) {
    return res
      .status(201)
      .json({ message: "USER REGISTERED", response: req.user.id });
  }

  login(req, res, next) {
    const user = req.user;
    return res
      .cookie("token", user.token, {
        maxAge: 3600000,
        signed: true,
        httpOnly: true,
      })
      .status(200)
      .json({ message: "login successful", response: user.id });
  }

  logout(req, res, next) {
    const user = req.user;
    return res
      .clearCookie("token")
      .status(200)
      .json({
        message: `user ${user.id} loged out`,
        response: "logout successful",
      });
  }
}

const sessionsController = new SessionsController();
export default sessionsController;
