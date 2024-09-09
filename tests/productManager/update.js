import ProductManager from "../../src/persistence/dao/fileSystem/ProductManager.js";

//* create a new instance of ProductsManager
const a = new ProductManager();

//? create a couple products
async function test() {
  await a.create("premezacla bizcochuelo de vanilla", 1800, 350, "almacen");
  await a.create("premezacla bizcochuelo de chocolate", 1950, 350, "almacen");
  await a.create("pan de mesa bimbo 360 Gr", 4000, 350, "almacen");
  await a.create("alfajor jorgito x3 unidades", 2500, 350, "almacen");

  //h3: testing update method

  //h1:update a product's category.
  console.log("updating category for product with id 4");
  await a.update({ id: 4, category: "golosinas" });
  console.log(await a.readId(4));

  //h1:update a product's photo.
  console.log("\n===============\n");
  console.log("updating photo for product with id 4");
  await a.update({ id: 4, photo: "https://random.imagecdn.app/150/150" });
  console.log(await a.readId(4));

  //h1:update a product's price.
  console.log("\n===============\n");
  console.log("updating price for product with id 4");
  await a.update({ id: 4, price: "1980" });
  console.log(await a.readId(4));

  //h1: update a product's title
  console.log("\n===============\n");
  console.log("updating title for product with id 4");
  await a.update({ id: 4, title: "alfajores jorgito, PACK X 3 UNI" });
  console.log(await a.readId(4));

  //h1: update a product's stock
  console.log("\n===============\n");
  console.log("updating stock for product with id 4");
  await a.update({ id: 4, stock: 30 });
  console.log(await a.readId(4));
  
  //h1: update a non existing product
  console.log("\n===============\n");
  console.log("updating a non existing product with id 44");
  try {
    await a.update({ id: 44, stock: 30 });
    // console.log(await a.readId(44));
  } catch (error) {    
    console.log(error);        
  }
}

test();