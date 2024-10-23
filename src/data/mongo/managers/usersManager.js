import MongoCrudManager from "./MongoCrudManager.js";
import User from "../models/user.model.js";

const UserManager = new MongoCrudManager(User);
export default UserManager;
