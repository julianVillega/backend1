import userManager from "../../src/persistence/dao/fileSystem/UserManager.js";

async function test() {
  try {
    const userId = await userManager.create(
      "userToDestroy@mail.com",
      "password",
      null,
      "user"
    );
    const user = await userManager.readId(userId);
    console.log(...user);
    await userManager.destroy(userId);
  } catch (error) {
    console.log(error);
  }
}

test();
