import { UserManager } from "../../src/persistence/dao/fileSystem/UserManager.js";

async function test() {
  const um = new UserManager();

  //h1: succesfully create user
  try {
    console.log("succesfully create user");

    console.log(
      await um.create("juli@mail.com", "juliPass", undefined, "manager")
    );
  } catch (error) {
    console.log(error);
  }

  //h1: create user without password
  try {
    console.log("create user without password");
    console.log(await um.create("asda@mail.com", "", undefined, "manager"));
  } catch (error) {
    console.log(error);
  }

  //h1: create user without email
  try {
    console.log("create user without email");
    console.log(await um.create("", "pass", undefined, "manager"));
  } catch (error) {
    console.log(error);
  }

  //h1: create user with an email that is in use
  try {
    console.log("create user with an email that is in use");
    console.log(
      await um.create(
        "juli@mail.com",
        "passSuperPasyPass",
        undefined,
        "manager"
      )
    );
  } catch (error) {
    console.log(error);
  }
}

test();
