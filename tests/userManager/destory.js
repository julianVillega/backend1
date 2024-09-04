import { User } from "../../src/models/User.js";
import { UserManager } from "../../src/persistence/dao/fileSystem/UserManager.js";

async function test() {
  const um = new UserManager();
  // create some users
  const user4 = await um.create("user4@mail.com", "pass");
  const user5 = await um.create("user5@mail.com", "pass");
  const user6 = await um.create("user6@mail.com", "pass");

  //h1: succesfully delete user
  try {
    console.log("succesfully delete user");
    console.log(`deleting user with id ${user4.id}`);
    console.log(await um.destroy(user4.id));
    console.log(`user's ${user4.id} deltionDate: ${user4.deletionDate}`);
  } catch (error) {
    console.log(error);
  }

  //h1: delete a deleted user
  try {
    console.log("\n");
    console.log("delete a deleted user");
    console.log(`deleting user with id ${user4.id} again`);
    await um.destroy(user4.id);
  } catch (error) {
    console.log(error);
  } finally {
    console.log(`user's ${user4.id} deltionDate: ${user4.deletionDate}`);
  }
}

test();
