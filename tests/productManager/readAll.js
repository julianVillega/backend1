import productManager from "../../src/persistence/dao/fileSystem/ProductManager.js";

//* create a new instance of ProductsManager

//? create a couple products
async function test() {
  //h3: test the ProductManager.readAll method:
  productManager.deleteAll();
  const products = [];
  let product =  await productManager.create("premezacla bizcochuelo de vanilla", 1800, 350, "almacen");
  products.push(product);
  product =  await productManager.create("harina", 980, 50, "almacen");
  products.push(product);
  product =  await productManager.create("sal gruesa", 1580, 20, "almacen");
  products.push(product);

  //h1: reading all
  console.log("reading all products");
  try {
    (await productManager.readAll()).forEach((p) => products.push(p));
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
    await productManager.destroy(idProd0);

    console.log(`product with id ${idProd0} should not be returned`);
    const readProducts = await productManager.readAll();
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
        await productManager.destroy(p.id);
      } catch (error) {
        console.log(`product with id ${p.id} was already deleted`);
      }
    }

    console.log("no products should be returned");
    const readProducts = await productManager.readAll();
    readProducts.forEach((p) => console.log(p));
  } catch (error) {
    console.log(error);
  }
}

test();
