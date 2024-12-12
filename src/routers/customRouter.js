import { Router } from "express";
import { verifyToken } from "../utils/jwt.js";

class CustomRouter {
  constructor() {
    this._router = Router();
  }

  tryCatch = (callbacks) =>
    callbacks.map((cb) => async (req, res, next) => {
      try {
        await cb(req, res, next);
      } catch (error) {
        return next(error);
      }
    });

  // create standard responses.
  responses = (req, res, next) => {
    res.json200 = (response, message) =>
      res.status(200).json({ response, message });
    res.json201 = (response, message) =>
      res.status(201).json({ response, message });
    res.json400 = (message) => res.status(400).json({ error: message });
    res.json401 = () => res.status(401).json({ error: "Bad Auth!" });
    res.json403 = () => res.status(403).json({ error: "Forbidden!" });
    res.json404 = () => res.status(404).json({ error: "Not found!" });
    return next();
  };

  // check if the user has the required role.
  policies = (policies) => async (req, res, next) => {
    try {
      if (policies.includes("PUBLIC")) {
        return next();
      }
      const token = req?.cookies?.token;

      if (!token) return res.json401();
      const data = verifyToken(token, process.env.SECRET);
      const { role, user_id } = data;
      const user = await readById(user_id);
      if (!role || !user) return res.json401();
      if (policies.includes(role)) {
        req.user = user;
        return next();
      }
      return res.json403();
    } catch (error) {
      return res.json400(error.message);
    }
  };

  create(path, policies, ...callbacks) {
    this._router.post(
      path,
      this.responses,
      this.policies(policies),
      this.tryCatch(callbacks)
    );
  }
  read(path, policies, ...callbacks) {
    this._router.get(
      path,
      this.responses,
      this.policies(policies),
      this.tryCatch(callbacks)
    );
  }
  update(path, policies, ...callbacks) {
    this._router.put(
      path,
      this.responses,
      this.policies(policies),
      this.tryCatch(callbacks)
    );
  }
  destroy(path, policies, ...callbacks) {
    this._router.delete(
      path,
      this.responses,
      this.policies(policies),
      this.tryCatch(callbacks)
    );
  }
  use(path, policies, ...callbacks) {
    this._router.use(
      path,
      this.responses,
      this.policies(policies),
      this.tryCatch(callbacks)
    );
  }
}

export default CustomRouter;
