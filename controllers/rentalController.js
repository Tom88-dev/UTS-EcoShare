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

// --- TAMBAHKAN DUA FUNGSI BARU DI BAWAH INI ---
const getOwnerRentals = asyncHandler(async (req, res) => {
  const rentals = await rentalService.listOwnerRentals(req.user.id);
  res.json({ success: true, data: rentals });
});

const updateStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = await rentalService.updateRentalStatus(id, status);
  res.json({ success: true, data: updated });
});

module.exports = { create, mine, getOwnerRentals, updateStatus };