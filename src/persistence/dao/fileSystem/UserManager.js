import { User } from "../../../models/User.js";

class UserManager {
  static #all = [];

  constructor() {
    UserManager.#all.push(new User("user1@mail.com", "user1Password"));
    UserManager.#all.push(new User("user2@mail.com", "user2Password"));
    UserManager.#all.push(new User("user3@mail.com", "user3Password"));
  }

  async create(email, password, photo, role) {
    try {
      // confirm the email is not used by othe users.
      if (UserManager.#all.some((user) => user.email === email)) {
        throw new Error(`The email address ${email} is already taken`);
      }

      // confirm the password is not empty
      if (password.length === 0) {
        throw new Error(`No password was provided`);
      }

      //create the new user
      UserManager.#all.push(new User(email, password, photo, role));
    } catch (error) {
      console.log(`Error at UserManager.create(): ${error}`);
    }
  }
}
