import { UserManager } from "../../src/persistence/dao/fileSystem/UserManager.js";

async function test() {
  const um = new UserManager();
  // create some users
  const user4 = await um.create("user4@mail.com", "pass");
  const user5 = await um.create("user5@mail.com", "pass");
  const user6 = await um.create("user6@mail.com", "pass");

  //h1: succesfully read all user
  try {
    console.log("succesfully all read user");

    console.log(await um.readAll(user4.id));
  } catch (error) {
    console.log(error);
  }

  //h1: read all users but not deleted users
  try {
    console.log("\n");
    console.log("read all users but not deleted users");
    console.log(`deleting user with id ${user4.id}`);
    await um.destroy(user4.id);
    console.log(`deleting user with id ${user5.id}`);
    await um.destroy(user5.id);
    console.log(`reading all user`);
    console.log(await um.readAll())
  } catch (error) {
    console.log(error);
  }

  //h1: read all users when there are no users
  try {
    console.log("\n");
    console.log("read all users when there are no users");
    console.log("deleting all users");
    for (const user of await um.readAll()) {
      await um.destroy(user.id);
    }
    console.log("readin all users");
    await um.readAll();
  } catch (error) {
    console.log(error);
  }
}

test();
