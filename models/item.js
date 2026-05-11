const { DataTypes } = require("sequelize");

let Item;

function initItemModel(sequelize) {
  Item = sequelize.define(
    "Item",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      ownerId: { type: DataTypes.INTEGER, allowNull: false },
      name: { type: DataTypes.STRING(191), allowNull: false },
      dailyPrice: { type: DataTypes.INTEGER, allowNull: false },
      stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    },
    {
      tableName: "items",
      underscored: true,
      timestamps: true,
    }
  );
  return Item;
}

module.exports = { initItemModel, get Item() { return Item; } };

