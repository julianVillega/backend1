import userManager from "../../src/persistence/dao/fileSystem/UserManager.js";

async function test() {
  //h1: succesfully create user
  try {
    await userManager.create("user1@mail.com", "user1Password", null, "user");
    await userManager.create("user1@mail.com", "user1Password", null, "admin");
    const users = await userManager.readAll();
    console.log(...users);
    
  } catch (error) {
    console.log(error);
  }
}

test();
