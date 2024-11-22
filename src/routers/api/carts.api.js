import { Router } from "express";
import  cartsController  from "../../controllers/mongo/carts.controller.js";

const cartsRouter = Router();

cartsRouter.get("/", cartsController.readAll);
cartsRouter.get("/:id", cartsController.read);
cartsRouter.post("/", cartsController.create);
cartsRouter.put("/:id", cartsController.update);
cartsRouter.delete("/:id", cartsController.delete);

export default cartsRouter