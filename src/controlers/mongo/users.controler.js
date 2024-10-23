import MongoCrudControler from "./mongoCRUD.controler.js";
import UsersManager from "../../data/mongo/managers/usersManager.js";

const UsersControler = new MongoCrudControler(UsersManager, "user");
