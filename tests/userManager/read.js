import userManager from "../../src/persistence/dao/fileSystem/UserManager.js";

async function test() {
  try {
    await userManager.create("user1@mail.com", "password", null, "admin")
    const user2Id = await userManager.create("user2@mail.com", "password", null, "admin")
    await userManager.create("user3@mail.com", "password", null, "admin")
    const user2 = await userManager.readId(user2Id);
    console.log(user2);    
  } catch (error) {
    console.log(error);    
  }
}

test();
