import { Router } from "express";
import  cartsControler  from "../../controlers/mongo/carts.controler.js";

const cartsRouter = Router();

cartsRouter.get("/", cartsControler.readAll);
cartsRouter.get("/:id", cartsControler.read);
cartsRouter.post("/", cartsControler.create);
cartsRouter.put("/:id", cartsControler.update);
cartsRouter.delete("/:id", cartsControler.delete);

export default cartsRouter