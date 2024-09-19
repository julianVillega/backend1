// products router
import { Router } from "express";
import productsControler from "../../controlers/products.controler.js";

const productsRouter = Router();

productsRouter.get("/", productsControler.readAll);
productsRouter.get("/:id", productsControler.read);
productsRouter.post("/", productsControler.create);
productsRouter.put("/:id", productsControler.update);
productsRouter.delete("/:id", productsControler.delete);


export default productsRouter;
