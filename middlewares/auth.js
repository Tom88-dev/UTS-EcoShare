const jwt = require("jsonwebtoken");
const { AppError } = require("../services/errors");
const models = require("../models");

function getBearerToken(req) {
  const h = req.headers.authorization;
  if (!h) return null;
  const [type, token] = h.split(" ");
  if (type !== "Bearer" || !token) return null;
  return token;
}

function requireAuth() {
  return async (req, res, next) => {
    void res;
    try {
      const token = getBearerToken(req);
      if (!token) throw new AppError("UNAUTHORIZED", "Missing bearer token", 401);

      const secret = process.env.JWT_SECRET;
      if (!secret) throw new Error("Missing env: JWT_SECRET");

      const payload = jwt.verify(token, secret);
      const user = await models.User.findByPk(payload.id || payload.sub);
      if (!user) throw new AppError("UNAUTHORIZED", "Invalid token", 401);

      req.user = { id: user.id, role: user.role, email: user.email };
      next();
    } catch (err) {
      next(err);
    }
  };
}

function requireRole(...roles) {
  return (req, res, next) => {
    void res;
    if (!req.user) return next(new AppError("UNAUTHORIZED", "Unauthorized", 401));
    if (!roles.includes(req.user.role)) {
      return next(new AppError("FORBIDDEN", "Forbidden", 403));
    }
    next();
  };
}

module.exports = { requireAuth, requireRole };

