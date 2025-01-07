import MongoCrudController from "./mongoCRUD.controller.js";
import usersService from "../../services/users.service.js";
class UsersController extends MongoCrudController {
  constructor() {
    super(usersService, "user");
    this.create = this.create.bind(this);
    this.verify = this.verify.bind(this);
  }

  async verify(req, res, next) {
    const { verificationCode, userId } = req.body;
    const user = await this.service.read(userId);
    if (user?.verificationCode === verificationCode) {
      await this.service.update(userId, { isVerified:true });
      res.json200("ok", "verification successful");
    }
    return res.json401();
  }
}

export default new UsersController();
