import productsManager from "../../src/data/fs/ProductManager.js";

//h3: testing create method
async function test() {
  //h1: succesfull product creation
  try {
    console.log("succesfull product creation");
    console.log(
      await productsManager.create("premezacla bizcochuelo de vanilla", 1800, 350, "almacen")
    );
  } catch (error) {
    console.log(error);
  }

//   //h1: create product without title
  try {
    console.log("\n==================\n");
    console.log("create product without title");
    console.log(await productsManager.create("", 1950, 350, "almacen"));
  } catch (error) {
    console.log(error);
  }

  //h1: create without product price
  try {
    console.log("\n==================\n");
    console.log("create without product price");
    console.log(
      await productsManager.create("pan de mesa bimbo 360 Gr", undefined, 350, "almacen")
    );
  } catch (error) {
    console.log(error);
  }

  //h1: create without product stock
  try {
    console.log("\n==================\n");
    console.log("create without product stock");
    console.log(
      await productsManager.create("pan de mesa bimbo 360 Gr", 5000, undefined, "almacen")
    );
  } catch (error) {
    console.log(error);
  }

  //h1: create without product category
  try {
    console.log("\n==================\n");
    console.log("create without product category");
    console.log(
      await productsManager.create("alfajor jorgito x3 unidades", 2500, 350, undefined)
    );
  } catch (error) {
    console.log(error);
  }
}

test();
