import userManager from "../data/fs/UserManager.js";
class UserControler {
  constructor() {}

  async readAll(req, res, next) {
    try {
      const { role } = req.query;
      const users = await userManager.readAll(role);
      if (users.length > 0) {
        res
          .status(200)
          .json({ message: `fetched ${users.length} users`, response: users });
      } else {
        const error = new Error("no users were found");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  }

  async readId(req, res, next) {
    try {
      const { id } = req.params;
      const user = await userManager.readId(id);
      if (user) {
        res
          .status(200)
          .json({ message: `fetched user with id ${id}`, response: user });
      } else {
        const error = new Error(`no users with id ${id} were found`);
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const { email, password, photo, role } = req.body;
      const user = await userManager.create(email, password, photo, role);
      if (user) {
        res.status(201).json({
          message: `created a new user with id ${user.id}`,
          response: user.id,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const userData = req.body;
      const user = await userManager.update({ id, ...userData });
      if (user) {
        res.status(200).json({
          message: `updated user with id ${user.id}`,
          response: user,
        });
      } else {
        const error = new Error(`no users with id ${id} were found`);
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deletionResult = await userManager.destroy(id);
      if (deletionResult) {
        res.status(200).json({
          message: `deleted user with id ${id}`,
          response: deletionResult,
        });
      } else {
        const error = new Error(
          `no users with id ${id} were found, deletion failed`
        );
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userId = await userManager.login(email, password);
      if (userId) {
        console.log(userId);
        return res
          .status(200)
          .json({ message: "login sucessfull", response: userId });
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
      console.log("loging out!!!");
      
      const { id } = req.params;
      const logutSuccessfull = await userManager.logout(id);
      if(logutSuccessfull){
        return res.status(200).json({message:"logout successfull", response:true});
      }else{
        const error = new Error();
        error.statusCode = 404;
        error.message = "User not found, logout failed"
      }
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

  async showUser(req, res, next) {
    try {
      const { userId } = req.params;
      const user = await userManager.readId(userId);
      res.render("userProfile.handlebars", { user });
    } catch (error) {
      next(error);
    }
  }
}

const userControler = new UserControler();
export default userControler;
