import passport from "./passportStrategies.mid.js";

const passportCb = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (error, user, info) => {
      if (error) return next(error);
      if (!user)
        return res
          .status(info.statusCode || 400,)
          .json({
            statusCode: info.statusCode || 400,
            message: info.message || "ERROR",
          });
      req.user = user;
      return next();
    })(req, res, next);
  };
};

export default passportCb;
