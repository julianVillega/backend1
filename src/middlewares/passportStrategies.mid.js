import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import userManager from "../data/mongo/managers/usersManager.js";
import { createHashUtil, verifyHashUtil } from "../utils/hash.utils.js";
import { createToken, verifyToken } from "../utils/jwt.js";
import "dotenv/config.js";
import usersService from "../services/users.service.js";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        let user = await userManager.readByEmail(email);
        if (user) {
          done(null, false, {
            message: "Email already in use",
            statusCode: 400,
          });
        }
        const data = req.body;
        const hashedPassword = createHashUtil(password);
        user = await userManager.create({ ...data, password: hashedPassword });
        await usersService.sendVerificationCode(user);
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
        //check user, password, and online status
        if (
          !user ||
          !verifyHashUtil(password, user.password)
        ) {
          const error = new Error();
          error.message = "Login failed";
          error.statusCode = 401;
          throw error;
        }
        if(!user.isVerified){
          console.log("user has not verified account")
          console.log("1 passport redirecting to verify view");
          return req.res.redirect(302, `/users/verify/${user.id}`);
        }
        //create the token
        const token = createToken({ userId: user._id, role: user.role });
        await userManager.update(user._id, { isOnline: true });
        user.token = token;
        done(null, user);
      } catch (error) {
        done(error, false, {
          message: error.message,
          statusCode: error.statusCode,
        });
      }
    }
  )
);

passport.use(
  "logout",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.signedCookies?.token,
      ]),
      secretOrKey: process.env.SECRET,
    },
    async (data, done) => {
      try {
        let user = await userManager.read(data.userId);
        if (!user) {
          done(null, false, { message: "Logout Failed", statusCode: 404 });
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
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.signedCookies?.token,
      ]),
      secretOrKey: process.env.SECRET,
    },
    async (data, done) => {
      try {
        const user = await userManager.read(data.userId);
        if (!user || !user.isOnline) {
          done(null, false, { message: "forbiden", statusCode: 401 });
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;
