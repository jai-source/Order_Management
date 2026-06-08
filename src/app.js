const express = require("express");


const authRoutes = require("./routes/auth.routes");

const productRoutes = require("./routes/product.route")

const app = express();

const orderRoutes =
require("./routes/order.route");
app.use(express.json());

app.use("/orders", orderRoutes);

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/products", productRoutes)

module.exports = app;