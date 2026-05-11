const { AppError } = require("./errors");
const { Item } = require("../models");

async function createItem(ownerId, payload) {
  const { name, dailyPrice, stock } = payload || {};
  if (!name || dailyPrice == null || stock == null) {
    throw new AppError(
      "VALIDATION_ERROR",
      "name, dailyPrice, and stock are required",
      400
    );
  }

  if (Number(dailyPrice) <= 0 || Number(stock) < 0) {
    throw new AppError("VALIDATION_ERROR", "Invalid dailyPrice/stock", 400);
  }

  const item = await Item.create({
    ownerId,
    name,
    dailyPrice: Number(dailyPrice),
    stock: Number(stock),
  });
  return item;
}

async function listActiveItems() {
  return await Item.findAll({ where: { isActive: true } });
}

module.exports = { createItem, listActiveItems };

