import ProductManager from "../../src/persistence/dao/fileSystem/ProductManager.js";

//* create a new instance of ProductsManager
const a = new ProductManager();

//? create a couple products
async function test() {
  await a.create("premezacla bizcochuelo de vanilla", 1800, 350, "almacen");
  await a.create("premezacla bizcochuelo de chocolate", 1950, 350, "almacen");
  await a.create("pan de mesa bimbo 360 Gr", 4000, 350, "almacen");
  await a.create("alfajor jorgito x3 unidades", 2500, 350, "almacen");
  
  //h1: delete a product
  console.log("deleting product with id 4");
  try {
    console.log("deletion result is: ", await a.destroy(4));
    console.log("reading product 4");
    console.log(await a.readId(4));
  } catch (error) {
    console.log(error);
  }

  //h1: delete the same product twice
  console.log("\n===============\n");
  console.log("deleting product with id 4 again");
  try {
    console.log("deletion result is: ", await a.destroy(4));
  } catch (error) {
    console.log(error);
  }

  //h1: deleting a non existing product
  console.log("\n===============\n");
  console.log("deleting product with id 44");
  try {
    console.log("deletion result is: ", await a.destroy(44));
  } catch (error) {
    console.log(error);
  }
}

test();
