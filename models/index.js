const { sequelize } = require("../config/database");

const { initUserModel } = require("./user");
const { initItemModel } = require("./item");
const { initRentalModel } = require("./rental");

function initModels() {
  initUserModel(sequelize);
  initItemModel(sequelize);
  initRentalModel(sequelize);

  const { User, Item, Rental } = sequelize.models;

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
  get User() {
    return sequelize.models.User;
  },
  get Item() {
    return sequelize.models.Item;
  },
  get Rental() {
    return sequelize.models.Rental;
  },
};

