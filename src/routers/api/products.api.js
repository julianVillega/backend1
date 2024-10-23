// products router
import { Router } from "express";
// import productsControler from "../../controlers/products.controler.js";
import productsControler from "../../controlers/mongo/products.controler.js";
import isValidProduct from "../../middlewares/isValidProduct.mid.js";
import setDefaultValues from "../../middlewares/setProductDefaultValues.mid.js";

const productsRouter = Router();

productsRouter.get("/", productsControler.readAll);
productsRouter.get("/:id", productsControler.read);
productsRouter.post("/", isValidProduct, setDefaultValues, productsControler.create);
productsRouter.put("/:id", isValidProduct, productsControler.update);
productsRouter.delete("/:id", productsControler.delete);

export default productsRouter;
