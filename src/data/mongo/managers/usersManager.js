import MongoCrudManager from "./MongoCrudManager.js";
import User from "../models/user.model.js";
import { verifyHashUtil } from "../../../utils/hash.utils.js";

class UserManager extends MongoCrudManager {
  constructor() {
    super(User);
  }
  async login(email, password) {
    try {
      const user = await this.model.findOne({email: email});
      if (user) {
        const correctPassword = verifyHashUtil(password, user.password);
        if(correctPassword){
          await this.update(user.id, { isOnline: true });
          return user.id;
        }
      }
      return null;
    } catch (error) {
      console.log("error at manager");
      throw error;
    }
  }

  async logout(userId) {
    try {
      const user = await this.read(userId);
      if (user) {
        await this.update(userId, { isOnline: false });
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }

  async isAuthenticated(userId) {
    try {
      const user = await this.read(userId);
      return user?.isOnline || false;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserManager(User);
