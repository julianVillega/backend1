export default function isSameUser(req, res, next){
  if (req.user.role === "ADMIN") return next();
  if(req.params.id === req.user._id.toString()) return next();
  console.log("Allow User Modification Middleware:Operation Canceled, authed user != target user");
  return res.json403();
}