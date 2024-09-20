export default function pathHandler(req, res, next) {
  const { url, method } = req;
  const message = `${method} ${url} not found`;  
  return res.status(404).json({ message });
}
