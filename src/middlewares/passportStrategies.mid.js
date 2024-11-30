import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import userManager from "../data/mongo/managers/usersManager.js";
import { createHashUtil } from "../utils/hash.utils.js";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        let user = await userManager.readByEmail(email);
        if (user) {
          const error = new Error();
          error.statusCode = 400;
          error.message = "Email already in use";
          throw error;
        }
        const data = req.body;
        const hashedPassword = createHashUtil(password);
        user = await userManager.create({ ...data, password: hashedPassword });
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
