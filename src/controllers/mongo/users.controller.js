import MongoCrudController from "./mongoCRUD.controller.js";
import UsersManager from "../../data/mongo/managers/usersManager.js";
import {createHashUtil} from "../../utils/hash.utils.js"

class UsersController extends MongoCrudController {
  constructor() {
    super(UsersManager, "user");
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.showUser = this.showUser.bind(this);
    this.showLogin = this.showLogin.bind(this);
    this.showRegister = this.showRegister.bind(this);
    this.create = this.create.bind(this)
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userId = await this.service.login(email, password);
      if (userId) {
        console.log(userId);
        return res
          .status(200)
          .json({ message: "login successful", response: userId });
      } else {
        const error = new Error();
        error.statusCode = 401;
        error.message = "invalid email or password";
        throw error;
      }
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { id } = req.params;
      const logoutSuccessful = await this.service.logout(id);
      if (logoutSuccessful) {
        return res
          .status(200)
          .json({ message: "logout successful", response: true });
      } else {
        const error = new Error();
        error.statusCode = 404;
        error.message = "User not found, logout failed";
      }
    } catch (error) {
      next(error);
    }
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

  create(req, res, next){
    try {
      const {password} = req.body
      const hashPassword = createHashUtil(password)
      req.body.password = hashPassword
      super.create(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

export default new UsersController();
