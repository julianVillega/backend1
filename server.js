import express from "express";
import router from "./src/routers/index.router.js";
import morgan from "morgan";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";

try {
  // 1. create the server
  const server = express();
  const port = 8000;
  const ready = () => console.log(`server ready on port ${port}`);

  // 1.2. config the server to use url params and query params
  server.use(express.urlencoded({ extended: true }));

  // 1.3. confg the server to use json as the body on requirements
  server.use(express.json());

  server.use(morgan("dev"));

  // 1.4. run the server
  server.listen(port, ready);

  // 2. set up the routes
  server.get("/api", index);
  // 2.1 products crud routes
  server.use(router);
  server.use(errorHandler);
  server.use(pathHandler);
} catch (error) {
  console.log(error);
}

function index(req, res) {
  try {
    return res.status(200).json({ message: "API CONECTED" });
  } catch (error) {
    const { statusCode, message } = error;
    return res
      .status(statusCode || 500)
      .json({ message: message || "FATAL ERROR" });
  }
}
