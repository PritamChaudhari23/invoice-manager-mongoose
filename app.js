require("dotenv").config();
const express = require("express");
const cors = require("cors");

const invoiceRoutes = require("./src/routes/invoiceRoutes");
const userRoutes = require("./src/routes/userRoutes");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend live !!!");
});

app.use("/api/v1/invoice", invoiceRoutes);
app.use("/api/v1/user", userRoutes);

module.exports = app;
