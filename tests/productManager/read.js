import productManager from "../../src/data/fs/ProductManager.js";

//? create a couple products
async function test() {
  //h3: test the reading methods:
  productManager.deleteAll();
  const products = [];
  let product =  await productManager.create("premezacla bizcochuelo de vanilla", 1800, 350, "almacen");
  products.push(product);
  product =  await productManager.create("harina", 980, 50, "almacen");
  products.push(product);
  product =  await productManager.create("sal gruesa", 1580, 20, "almacen");
  products.push(product);
  
  const prod0Id = products[0].id;

  // //h1: retrieve a single product
  try {
    console.log(`reading product with id ${prod0Id}`);
    console.log(await productManager.readId(prod0Id));
  } catch (error) {
    console.log("test console log: ", error);
  }

  // //h1: retrieve a non existent product
  console.log("\n===============\n");
  console.log("reading non existing product with id 33");
  try {
    console.log(await productManager.readId(33));
  } catch (error) {
    console.log("test console log: ", error);
  }

  //h1: retrieve a product that was deleted
  console.log("\n===============\n");
  console.log("reading a product that was deleted");
  try {
    console.log(
      `deleting product ${prod0Id}, deletion result :`,
      await productManager.destroy(prod0Id)
    );
    console.log(await productManager.readId(prod0Id));
  } catch (error) {
    console.log("test console log: ", error);
  }
}

test();
