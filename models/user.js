const { DataTypes } = require("sequelize");

let User;

function initUserModel(sequelize) {
  User = sequelize.define(
    "User",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      email: { type: DataTypes.STRING(191), allowNull: false, unique: true },
      passwordHash: { type: DataTypes.STRING(191), allowNull: false },
      role: {
        type: DataTypes.ENUM("RENTER", "OWNER"),
        allowNull: false,
        defaultValue: "RENTER",
      },
    },
    {
      tableName: "users",
      underscored: true,
      timestamps: true,
    }
  );

  return User;
}

module.exports = { initUserModel, get User() { return User; } };

