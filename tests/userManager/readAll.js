import userManager from "../../src/data/fs/UserManager.js";

async function test() {
  try {
    await userManager.create("user1@mail.com", "password", null, "admin")
    await userManager.create("user2@mail.com", "password", null, "admin")
    await userManager.create("user3@mail.com", "password", null, "admin")
    const users = await userManager.readAll();
    console.log(...users);    
  } catch (error) {
    console.log(error);    
  }
}

test();
