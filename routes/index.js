const express = require("express");

const authRoutes = require("./authRoutes");
const itemRoutes = require("./itemRoutes");
const rentalRoutes = require("./rentalRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/items", itemRoutes);
router.use("/rentals", rentalRoutes);

module.exports = router;

