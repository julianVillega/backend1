import userManager from "../data/fs/UserManager.js";

export default async function isAuthenticated(req, res, next) {
  try {
    console.log("is auth mid");
    const { userId } = req.params;
    const isAuth = await userManager.isAuthenticated(userId);
    if (isAuth) {
      console.log("IS AUTH");
      next();
    } else {
      console.log("IS NOT AUTH");
      return res.redirect(302, "/users/login");
    }
  } catch (error) {
    next(error);
  }
}
