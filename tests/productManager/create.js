import ProductManager from "../../src/persistence/dao/fileSystem/ProductManager.js";

//* create a new instance of ProductsManager
const a = new ProductManager();

//h3: testing create method
console.log(await a.create("premezacla bizcochuelo de vanilla", 1800, 350, "almacen"));
console.log(await a.create("premezacla bizcochuelo de chocolate", 1950, 350, "almacen"));
console.log(await a.create("pan de mesa bimbo 360 Gr", 4000, 350, "almacen"));
console.log(await a.create("alfajor jorgito x3 unidades", 2500, 350, "almacen"));


