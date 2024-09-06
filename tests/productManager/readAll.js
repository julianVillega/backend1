import ProductManager from "../../src/persistence/dao/fileSystem/ProductManager.js";

//* create a new instance of ProductsManager
const pm = new ProductManager();

//? create a couple products
async function test() {
  //h3: test the ProductManager.readAll method:
  const products = [];

  //h1: reading all
  console.log("reading all products");
  try {
    (await pm.readAll()).forEach((p) => products.push(p));
    products.forEach((p) => console.log(p));
  } catch (error) {
    console.log(error);
  }

  //h1: reading all products when some products were deleted
  try {
    console.log("\n=======================\n");

    console.log("reading all products when some products were deleted");
    const idProd0 = products[0].id;
    console.log(`deleting product with id: ${idProd0}`);
    await pm.destroy(idProd0);

    console.log(`product with id ${idProd0} should not be returned`);
    const readProducts = await pm.readAll();
    readProducts.forEach((p) => console.log(p));
  } catch (error) {
    console.log(error);
  }

  //h1: reading all products when there are no products
  try {
    console.log("reading all products when there are no products");

    console.log("deleting all products");
    for (const p of products) {
      try {
        await pm.destroy(p.id);
      } catch (error) {
        console.log(`product with id ${p.id} was already deleted`);
      }
    }

    console.log("no products should be returned");
    const readProducts = await pm.readAll();
    readProducts.forEach((p) => console.log(p));
  } catch (error) {
    console.log(error);
  }
}

test();
