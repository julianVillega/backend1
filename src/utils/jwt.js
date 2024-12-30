import jwt from "jsonwebtoken";

const createToken = (data) =>
  jwt.sign(data, process.env.SECRET, { expiresIn: 3600 });

const verifyToken = (token) => {
  if (!token) {
    const error = new Error("Auth Failed");
    error.statusCode = 401;
    throw error;
  }
  return jwt.verify(token, process.env.SECRET);
};

export { createToken, verifyToken };
