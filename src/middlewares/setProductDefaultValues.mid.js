export default function setDefaultValues(req, res, next) {
  // Set category and photo with default values if necessary.
  !req.body.category && (req.body.category = null);
  !req.body.photo && (req.body.photo = "https://random.imagecdn.app/200/200");
  !req.body.price && (req.body.price = 1);
  !req.body.stock && (req.body.stock = 1);
  next();
}
