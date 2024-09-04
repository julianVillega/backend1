import { User } from "../../src/models/User.js";
import { UserManager } from "../../src/persistence/dao/fileSystem/UserManager.js";

async function test() {
  const um = new UserManager();
  // create some users
  const user4 = await um.create("user4@mail.com", "pass");
  const user5 = await um.create("user5@mail.com", "pass");
  const user6 = await um.create("user6@mail.com", "pass");

  //h1: succesfully read user
  try {
    console.log("succesfully read user");

    console.log(
      await um.readId(user4.id)
    );
  } catch (error) {
    console.log(error);
  }

  //h1: read a deleted user
  try {
    console.log("\n")
    console.log("read a deleted user");
    console.log(`deleting user with id ${user4.id}`);
    await um.destroy(user4.id);    
    console.log(`read user with id ${user4.id}`);
    await um.readId(user4.id);    
  } catch (error) {
    console.log(error);
  }  
}

test();
