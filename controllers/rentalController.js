const { asyncHandler } = require("../middlewares/asyncHandler");
const rentalService = require("../services/rentalService");

const create = asyncHandler(async (req, res) => {
  const rental = await rentalService.createRental({
    renterId: req.user.id,
    itemId: req.body.itemId,
    quantity: req.body.quantity,
    days: req.body.days,
  });
  res.status(201).json({ success: true, data: rental });
});

const mine = asyncHandler(async (req, res) => {
  const rentals = await rentalService.listMyRentals(req.user.id);
  res.json({ success: true, data: rentals });
});

module.exports = { create, mine };

