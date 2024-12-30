import express from "express";
import router from "./src/routers/index.router.js";
import morgan from "morgan";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import "dotenv/config.js";
import dbConnection from "./src/utils/db.js";
import cookieParser from "cookie-parser";

try {
  // 1. create the server
  const server = express();
  const port = 8000;
  const ready = () => {
    console.log(`server ready on port ${port}`);
    dbConnection();
  };

  // config the server to use url params and query params
  server.use(express.urlencoded({ extended: true }));

  // config the server to use json as the body on requirements
  server.use(express.json());

  // config cookies middleware
  server.use(cookieParser(process.env.SECRET))

  server.use(morgan("dev"));

  // run the server
  server.listen(port, ready);

  // set up the routes
  server.get("/api", index);
  //  products crud routes
  server.use(router);

  // static folder
  server.use("/public", express.static(__dirname + "/public"));

  server.use(errorHandler);
  server.use(pathHandler);

  //handlebars
  server.engine("handlebars", engine());
  server.set("view engine", "handlebars");
  server.set("views", __dirname + "/src/views");
} catch (error) {
  console.log(error);
}

function index(req, res) {
  try {
    return res.status(200).json({ message: "API CONNECTED" });
  } catch (error) {
    const { statusCode, message } = error;
    return res
      .status(statusCode || 500)
      .json({ message: message || "FATAL ERROR" });
  }
}
