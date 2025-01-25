import usersService from "../../services/users.service.js";

class PasswordController {
  constructor() {}
  async sendRecoveryCode(req, res, next) {
    const { email } = req.body;
    await usersService.sendPasswordRecoveryCode(email);
    return res.json200("200 OK", "");
  }

  async updatePassword(req, res, next) {
    const { recoveryCode, email, newPassword } = req.body;
    const result = await usersService.updatePassword(email, recoveryCode, newPassword);
    if (result) return res.json200("password updated");
    return res.json400();
    
  }
}

export default new PasswordController();
