import ProductManager from "../../src/persistence/dao/fileSystem/ProductManager.js";

//* create a new instance of ProductsManager
const a = new ProductManager();

//? create a couple products
async function test() {
  //h3: test the reading methods:

  //h1: reading all products when there are no products
  console.log("reading all products when there are no products");
  try {
    console.log(await a.readAll());
  } catch (error) {
    console.log(error);
  }

  // creating products
  console.log("creating products");

  await a.create("premezacla bizcochuelo de vanilla", 1800, 350, "almacen");
  await a.create("premezacla bizcochuelo de chocolate", 1950, 350, "almacen");
  await a.create("pan de mesa bimbo 360 Gr", 4000, 350, "almacen");
  await a.create("alfajor jorgito x3 unidades", 2500, 350, "almacen");

  // //h1: retrieve all products
  console.log("reading all products");
  console.log(await a.readAll());

  // //h1: retrieve a single product
  console.log("reading product with id 3");
  try {
    console.log(await a.readId(3));
  } catch (error) {
    console.log(error);
  }

  // //h1: retrieve a non existent product
  console.log("reading non existing product with id 33");
  try {
    console.log(await a.readId(33));
  } catch (error) {
    console.log(error);
  }
}

test();
