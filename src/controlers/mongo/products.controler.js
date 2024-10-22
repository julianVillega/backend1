import productsManager from "../../data/mongo/managers/productsManager.js";
import MongoCrudControler from "./mongoCRUD.controler.js";

const productsControler = new MongoCrudControler(productsManager, "product");
export default productsControler;
