const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { AppError } = require("./errors");
const db = require("../models"); // Cukup panggil db di sini, tidak perlu panggil getUser() dulu

function signToken(user) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("Missing env: JWT_SECRET");

  return jwt.sign(
    { role: user.role, email: user.email },
    secret,
    { subject: String(user.id), expiresIn: process.env.JWT_EXPIRES_IN || "2h" }
  );
}

async function register({ email, password, role }) {
  if (!email || !password) {
    throw new AppError("VALIDATION_ERROR", "email and password are required", 400);
  }
  if (role && !["RENTER", "OWNER"].includes(role)) {
    throw new AppError("VALIDATION_ERROR", "Invalid role", 400);
  }

  // PANGGIL DATABASE DI SINI (Saat fungsi register dijalankan)
  const User = db.User;

  const existing = await User.findOne({ where: { email } });
  if (existing) throw new AppError("CONFLICT", "Email already used", 409);

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash, role: role || "RENTER" });

  const token = signToken(user);
  return { user: { id: user.id, email: user.email, role: user.role }, token };
}

async function login({ email, password }) {
  if (!email || !password) {
    throw new AppError("VALIDATION_ERROR", "email and password are required", 400);
  }

  // PANGGIL DATABASE JUGA DI SINI (Saat fungsi login dijalankan)
  const User = db.User;

  const user = await User.findOne({ where: { email } });
  if (!user) throw new AppError("UNAUTHORIZED", "Invalid credentials", 401);
  
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw new AppError("UNAUTHORIZED", "Invalid credentials", 401);

  const token = signToken(user);
  return { user: { id: user.id, email: user.email, role: user.role }, token };
}

module.exports = { register, login };

