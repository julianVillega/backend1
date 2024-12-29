import MongoCrudService from "./mongoCrudService.js";
import userManager from "../data/mongo/managers/usersManager.js"
import sendEmail from "../utils/mailing.util.js";
import crypto from "crypto"

class UserService extends MongoCrudService{
  constructor(){
    super(userManager)
  }
  async sendVerificationCode(user){
    const verificationCode = crypto.randomBytes(12).toString("hex")
    const data = {email: user.email, verificationCode}
    await this.manager.update(user.id, {verificationCode})
    await sendEmail(data)
  }
}

export default new UserService();