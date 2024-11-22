export default function setDefaultUserValues(req, res, next) {
  try {
    // Set role and photo if not already defined.
    !req.body.role && (req.body.role = "user");
    !req.body.photo && (req.body.photo = "https://random.imagecdn.app/200/200");
    next();
  } catch (error) {
    next(error);
  }
}
