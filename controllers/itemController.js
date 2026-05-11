const { asyncHandler } = require("../middlewares/asyncHandler");
const itemService = require("../services/itemService");

const create = asyncHandler(async (req, res) => {
  const item = await itemService.createItem(req.user.id, req.body);
  res.status(201).json({ success: true, data: item });
});

const list = asyncHandler(async (req, res) => {
  const items = await itemService.listActiveItems();
  res.json({ success: true, data: items });
});

module.exports = { create, list };

