const { AppError } = require("./errors");
const { sequelize, Item, Rental } = require("../models");

function calculateTotalCost({ dailyPrice, quantity, days }) {
  return Number(dailyPrice) * Number(quantity) * Number(days);
}

async function createRental({ renterId, itemId, quantity, days }) {
  if (!itemId || !quantity || !days) {
    throw new AppError(
      "VALIDATION_ERROR",
      "itemId, quantity, and days are required",
      400
    );
  }

  const q = Number(quantity);
  const d = Number(days);
  if (!Number.isInteger(q) || q <= 0 || !Number.isInteger(d) || d <= 0) {
    throw new AppError("VALIDATION_ERROR", "quantity/days must be positive int", 400);
  }

  return await sequelize.transaction(async (t) => {
    // Lock the row to prevent race conditions on stock.
    const item = await Item.findByPk(itemId, {
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (!item || !item.isActive) throw new AppError("NOT_FOUND", "Item not found", 404);

    if (item.stock < q) {
      throw new AppError("OUT_OF_STOCK", "Insufficient stock", 409, {
        available: item.stock,
      });
    }

    const totalCost = calculateTotalCost({
      dailyPrice: item.dailyPrice,
      quantity: q,
      days: d,
    });

    await item.update({ stock: item.stock - q }, { transaction: t });

    const rental = await Rental.create(
      { renterId, itemId: item.id, quantity: q, days: d, totalCost },
      { transaction: t }
    );

    return rental;
  });
}

async function listMyRentals(renterId) {
  return await Rental.findAll({ where: { renterId } });
}

module.exports = { createRental, listMyRentals, calculateTotalCost };

