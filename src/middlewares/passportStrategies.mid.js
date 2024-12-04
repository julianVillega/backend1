import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import userManager from "../data/mongo/managers/usersManager.js";
import { createHashUtil, verifyHashUtil } from "../utils/hash.utils.js";
import { createToken, verifyToken } from "../utils/jwt.js";
import "dotenv/config.js";

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

passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        //find the user
        const user = await userManager.readByEmail(email);
        //check user and password
        if (
          !user ||
          !verifyHashUtil(password, user.password) ||
          user.isOnline
        ) {
          const error = new Error();
          error.statusCode = 401;
          error.message = "Authentication Failed";
          throw error;
        }
        //create the token
        const token = createToken({ userId: user._id, role: user.role });
        await userManager.update(user._id, { isOnline: true });
        user.token = token;
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "logout",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.signedCookies?.token]),
      secretOrKey: process.env.SECRET,
    },
    async (data, done) => {
      try {
        let user = await userManager.read(data.userId);
        if (!user) {
          const error = new Error();
          error.message = "Logout Failed";
          error.statusCode = 404;
          throw error;
        }
        user = await userManager.update(user._id, { isOnline: false });
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "online",
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.signedCookies?.token]),
    secretOrKey: process.env.SECRET,
  }, 
  async (data, done) =>{
    try {
      const user = await userManager.read(data.userId);
      if(!user || !user.isOnline){
        const error = new Error();
        error.statusCode = 401;
        error.message = "forbiden"
        throw error;
      }
      done(null, user)
    } catch (error) {
      done(error)
    }
  })
);

export default passport;
