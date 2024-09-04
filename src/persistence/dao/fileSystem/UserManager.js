import { User } from "../../../models/User.js";

export class UserManager {
  static #all = [];

  constructor() {
    UserManager.#all.push(new User("user1@mail.com", "user1Password"));
    UserManager.#all.push(new User("user2@mail.com", "user2Password"));
    UserManager.#all.push(new User("user3@mail.com", "user3Password"));
  }

  create(email, password, photo, role) {
    const result = new Promise((resolve, reject) => {
      try {
        // confirm the email is not empty
        if (!email) {
          reject(`No email was provided`);
        }

        // confirm the email is not used by othe users.
        if (UserManager.#all.some((user) => user.email === email)) {
          reject(`The email address ${email} is already taken`);
        }

        // confirm the password is not empty
        if (!password) {
          reject(`No password was provided`);
        }

        //create the new user
        const user = new User(email, password, photo, role);
        UserManager.#all.push(user);
        resolve(user);
      } catch (error) {
        reject(`Error at UserManager.create(): ${error}`);
      }
    });
    return result;
  }
}
