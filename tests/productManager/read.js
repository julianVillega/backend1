import ProductManager from "../../src/persistence/dao/fileSystem/ProductManager.js";

//* create a new instance of ProductsManager
const pm = new ProductManager();

//? create a couple products
async function test() {
  //h3: test the reading methods:

  const products = [];

  try {
    (await pm.readAll()).forEach((p) => products.push(p));
    // products.forEach((p) => console.log(p));
  } catch (error) {
    console.log(error);
  }
  const prod0Id = products[0].id;

  // //h1: retrieve a single product
  try {
    console.log(`reading product with id ${prod0Id}`);
    console.log(await pm.readId(prod0Id));
  } catch (error) {
    console.log(error);
  }

  // //h1: retrieve a non existent product
  console.log("\n===============\n");
  console.log("reading non existing product with id 33");
  try {
    console.log(await pm.readId(33));
  } catch (error) {
    console.log(error);
  }

  //h1: retrieve a product that was deleted
  console.log("\n===============\n");
  console.log("reading a product that was deleted");
  try {
    console.log(`deleting product ${prod0Id}, deletion result :`, await pm.destroy(prod0Id));
    console.log(await pm.readId(prod0Id));
  } catch (error) {
    console.log(error);
  }
}

test();
