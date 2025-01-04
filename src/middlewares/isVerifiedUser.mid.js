export default async function isVerifiedUser(req, res, next){
  if(req.user.isVerified) return next()
  console.log("user has not verified account")
  return res.redirect(302, "/users/verify");
}