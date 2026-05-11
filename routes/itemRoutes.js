const express = require("express");
const itemController = require("../controllers/itemController");
const { requireAuth, requireRole } = require("../middlewares/auth");

const router = express.Router();

router.get("/", itemController.list);
router.post("/", requireAuth(), requireRole("OWNER"), itemController.create);

module.exports = router;

