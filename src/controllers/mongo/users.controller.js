import MongoCrudController from "./mongoCRUD.controller.js";
import usersService from "../../services/users.service.js";
class UsersController extends MongoCrudController {
  constructor() {
    super(usersService, "user");
    this.showUser = this.showUser.bind(this);
    this.showLogin = this.showLogin.bind(this);
    this.showRegister = this.showRegister.bind(this);
    this.create = this.create.bind(this)
  }


  async showUser(req, res, next) {
    try {
      const { userId } = req.params;
      const user = await this.service.read(userId);
      res.render("userProfile.handlebars", { user });
    } catch (error) {
      next(error);
    }
  }

  showLogin(req, res, next) {
    try {
      res.render("login.handlebars", {});
    } catch (error) {
      next(error);
    }
  }

  showRegister(req, res, next) {
    try {
      res.render("register");
    } catch (error) {
      next(error);
    }
  }
  
}

export default new UsersController();
