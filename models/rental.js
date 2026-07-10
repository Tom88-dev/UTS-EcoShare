const { DataTypes } = require("sequelize");

let Rental;

function initRentalModel(sequelize) {
  Rental = sequelize.define(
    "Rental",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      itemId: { type: DataTypes.INTEGER, allowNull: false },
      renterId: { type: DataTypes.INTEGER, allowNull: false },
      quantity: { type: DataTypes.INTEGER, allowNull: false },
      days: { type: DataTypes.INTEGER, allowNull: false },
      totalCost: { type: DataTypes.INTEGER, allowNull: false },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "CREATED",
      },
    },
    {
      tableName: "rentals",
      underscored: true,
      timestamps: true,
    }
  );
  return Rental;
}

module.exports = { initRentalModel, get Rental() { return Rental; } };

