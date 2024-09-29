import { User } from "../../models/User.js";
import fs from "fs";

export class UserManager {
  constructor(path) {
    this.path = path;
    this.exists();
  }

  async exists() {
    // creates the products file if it doesn't exists
    try {
      const fileExists = fs.existsSync(this.path);
      if (!fileExists) {
        await fs.promises.writeFile(this.path, JSON.stringify([]));
        console.log("users file created");
      } else {
        console.log("users file already exists");
      }
    } catch (error) {
      throw error;
    }
  }

  async readAll(role) {
    try {
      const usersJson = await fs.promises.readFile(this.path, "utf-8");
      const allUsers = JSON.parse(usersJson);
      if (role) {
        return allUsers.filter((user) => user.role === role);
      }
      return allUsers;
    } catch (error) {
      throw error;
    }
  }

  async readId(id) {
    try {
      const usersJson = await fs.promises.readFile(this.path, "utf-8");
      const allUsers = JSON.parse(usersJson);
      return allUsers.filter((user) => user.id === id)[0];
    } catch (error) {
      throw error;
    }
  }

  async create(email, password, photo, role) {
    try {
      // 1. create an instance of user
      const newUser = new User(email, password, photo, role);

      // 2. read all user from
      const allUsers = await this.readAll();

      // 3. add user
      allUsers.push(newUser);

      //4. write the file
      await fs.promises.writeFile(this.path, JSON.stringify(allUsers, null, 2));
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async update({ id, ...rest }) {
    try {
      const allUsers = await this.readAll();
      const user = allUsers.find((user) => user.id === id);
      if(!user) return null;
      for (const [key, value] of Object.entries(rest)) {
        user[key] = value;
      }

      await fs.promises.writeFile(this.path, JSON.stringify(allUsers, null, 2));
      return user;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const allUsers = await this.readAll();
      if(!allUsers.find(user=> user.id === id)){
        return false;
      }
      const otherUsers = allUsers.filter((user) => user.id != id);      
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(otherUsers, null, 2)
      );
      return true;
    } catch (error) {
      throw error;
    }
  }
}
const userManager = new UserManager("./src/data/fs/files/users.json/");
export default userManager;
