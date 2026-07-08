require("dotenv").config();

const express = require("express");

const cors = require("cors");

const { notFound } = require("./middlewares/notFound");
const { errorHandler } = require("./middlewares/errorHandler");
const apiRoutes = require("./routes");
const { initDatabase } = require("./models");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ success: true, message: "OK" });
});

app.use("/api", apiRoutes);

app.use(notFound);
app.use(errorHandler);

const port = Number(process.env.PORT || 3000);

async function start() {
  await initDatabase();
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Eco-Share API listening on :${port}`);
  });
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Failed to start server:", err);
  process.exit(1);
});

