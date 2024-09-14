import express from "express";
import productsManager from "./src/persistence/dao/fileSystem/ProductManager.js";

try {
  // 1. create the server
  const server = express();
  const port = 8000;
  const ready = () => console.log(`server ready on port ${port}`);

  // 1.2. config the server to use url params and query params
  server.use(express.urlencoded({ extended: true }));

  // 1.3. confg the server to use json as the body on requirements
  server.use(express.json());

  // 1.4. run the server
  server.listen(port, ready);

  // 2. set up the routes
  server.get("/", index);
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
