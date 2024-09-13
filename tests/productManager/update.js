import productManager from "../../src/persistence/dao/fileSystem/ProductManager.js";

//? create a couple products
async function test() {
  await productManager.deleteAll()
  const product = await productManager.create(
    "premezacla bizcochuelo de vanilla",
    1800,
    350,
    "almacen"
  );

  //h3: testing update method

  //h1:update a product's category.
  console.log(`updating category for product with id ${product.id}`);
  await productManager.update({ id: product.id, category: "golosinas" });
  console.log(await productManager.readId(product.id));

  //h1:update a product's photo.
  console.log("\n===============\n");
  console.log(`updating photo for product with id ${product.id}`);
  await productManager.update({
    id: product.id,
    photo: "https://random.imagecdn.app/150/150",
  });
  console.log(await productManager.readId(product.id));

  //h1:update a product's price.
  console.log("\n===============\n");
  console.log(`updating price for product with id ${product.id}`);
  await productManager.update({ id: product.id, price: "1980" });
  console.log(await productManager.readId(product.id));

  //h1: update a product's title
  console.log("\n===============\n");
  console.log(`updating title for product with id ${product.id}`);
  await productManager.update({
    id: product.id,
    title: "alfajores jorgito, PACK X 3 UNI",
  });
  console.log(await productManager.readId(product.id));

  //h1: update a product's stock
  console.log("\n===============\n");
  console.log(`updating stock for product with id ${product.id}`);
  await productManager.update({ id: product.id, stock: 30 });
  console.log(await productManager.readId(product.id));

  //h1: update a non existing product
  console.log("\n===============\n");
  console.log(`updating a non existing product with id 44`);
  try {
    await productManager.update({ id: 44, stock: 30 });
    // console.log(await a.readId(44));
  } catch (error) {
    console.log(error);
  }
}

test();
