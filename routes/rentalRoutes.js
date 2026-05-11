const express = require("express");
const rentalController = require("../controllers/rentalController");
const { requireAuth, requireRole } = require("../middlewares/auth");

const router = express.Router();

router.post("/", requireAuth(), requireRole("RENTER"), rentalController.create);
router.get("/me", requireAuth(), rentalController.mine);

module.exports = router;

