const express = require("express");

const authRoutes = require("./routes/auth.routes");

const productRoutes = require("./routes/product.route")

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/products", productRoutes)

module.exports = app;