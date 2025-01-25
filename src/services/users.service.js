import MongoCrudService from "./mongoCrudService.js";
import userManager from "../data/mongo/managers/usersManager.js";
import sendEmail from "../utils/mailing.util.js";
import { sendPasswordRecoveryCodeEmail } from "../utils/mailing.util.js";
import { createHashUtil } from "../utils/hash.utils.js";
import crypto from "crypto"

class UserService extends MongoCrudService {
  constructor() {
    super(userManager);
    this.sendVerificationCode = this.sendVerificationCode.bind(this);
    this.sendPasswordRecoveryCode = this.sendPasswordRecoveryCode.bind(this)
    this.updatePassword = this.updatePassword.bind(this);
  }
  async sendVerificationCode(user) {
    const verificationCode = crypto.randomBytes(12).toString("hex");
    const data = { email: user.email, verificationCode };
    await this.manager.update(user.id, { verificationCode });
    await sendEmail(data);
  }

  async sendPasswordRecoveryCode(email) {
    const user = await this.manager.readByEmail(email);
    if (!user) return null;
    const recoveryCode = crypto.randomBytes(12).toString("hex");
    await this.manager.update(user.id, { passwordRecoveryCode: recoveryCode });
    await sendPasswordRecoveryCodeEmail(email, recoveryCode);
  }

  async updatePassword(email, passwordRecoveryCode, newPassowrd) {
    const user = await this.manager.readByEmail(email);
    if (!user) return false;
    if (passwordRecoveryCode === user.passwordRecoveryCode) {
      const hashedPassword = createHashUtil(newPassowrd)
      await this.manager.update(user.id, {password:hashedPassword, passwordRecoveryCode:""});
      return true;
    }
    return false
  }
}

export default new UserService();
