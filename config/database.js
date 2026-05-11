const { Sequelize } = require("sequelize");

function requiredEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env: ${name}`);
  return v;
}

const sequelize = new Sequelize(
  requiredEnv("DB_NAME"),
  requiredEnv("DB_USER"),
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT || 3306),
    dialect: "mysql",
    logging: false,
    pool: {
      max: Number(process.env.DB_POOL_MAX || 10),
      min: 0,
      idle: 10000,
    },
    dialectOptions: {
      // keep as default; can be extended for ssl later
    },
  }
);

module.exports = { sequelize };

