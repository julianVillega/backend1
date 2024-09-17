import productManager from "../../src/data/fs/ProductManager.js";

//? create a couple products
async function test() {
  await productManager.deleteAll();
  const product =  await productManager.create("premezacla bizcochuelo de vanilla", 1800, 350, "almacen");
  
  //h1: delete a product
  console.log(`deleting product with id ${product.id}`);
  try {
    console.log("deletion result is: ", await productManager.destroy(product.id));
    console.log("reading product 4");
    console.log(await productManager.readId(product.id));
  } catch (error) {
    console.log(error);
  }

  //h1: delete the same product twice
  console.log("\n===============\n");
  console.log(`deleting product with id ${product.id} again`);
  try {
    console.log("deletion result is: ", await productManager.destroy(product.id));
  } catch (error) {
    console.log(error);
  }

  //h1: deleting a non existing product
  console.log("\n===============\n");
  console.log(`deleting product with id 44`);
  try {
    console.log("deletion result is: ", await productManager.destroy(44));
  } catch (error) {
    console.log(error);
  }
}

test();
