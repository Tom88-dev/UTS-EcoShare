const { sequelize } = require("../config/database");

const { initUserModel, User } = require("./user");
const { initItemModel, Item } = require("./item");
const { initRentalModel, Rental } = require("./rental");

function initModels() {
  initUserModel(sequelize);
  initItemModel(sequelize);
  initRentalModel(sequelize);

  // Associations
  User.hasMany(Item, { foreignKey: "ownerId", as: "ownedItems" });
  Item.belongsTo(User, { foreignKey: "ownerId", as: "owner" });

  User.hasMany(Rental, { foreignKey: "renterId", as: "rentals" });
  Rental.belongsTo(User, { foreignKey: "renterId", as: "renter" });

  Item.hasMany(Rental, { foreignKey: "itemId", as: "rentals" });
  Rental.belongsTo(Item, { foreignKey: "itemId", as: "item" });
}

async function initDatabase() {
  initModels();
  await sequelize.authenticate();

  // For UTS/dev convenience. In production, use migrations.
  if (process.env.DB_SYNC === "true") {
    await sequelize.sync({ alter: true });
  }
}

module.exports = {
  sequelize,
  initDatabase,
  User,
  Item,
  Rental,
};

