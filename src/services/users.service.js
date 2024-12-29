import MongoCrudService from "./mongoCrudService.js";
import userManager from "../data/mongo/managers/usersManager.js"

class UserService extends MongoCrudService{
  constructor(){
    super(userManager)
  }
}

export default new UserService();