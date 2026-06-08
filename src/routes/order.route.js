const express = require("express");
const router = express.Router();

const verifyToken =
require("..//middleware/auth.middleware");

const authorizeRole =
require("../middleware/role.middleware");

const validate =
require("../middleware/validation.middleware");

const {
    createOrderSchema
} = require("../validation/order.validations");

const {
    createOrder, getOrders, cancelOrder, acceptOrder, rejectOrder, shipOrder, deliverOrder 
} = require("../controllers/order.controller");



router.post(
    "/",
    verifyToken,
    authorizeRole("Buyer"),
    validate(createOrderSchema),
    createOrder
);

router.get(
    "/",
    verifyToken,
    getOrders
);

router.patch(
    "/:id/cancel",
    verifyToken,
    authorizeRole("Buyer"),
    cancelOrder
);


router.patch(
    "/:id/accept",
    verifyToken,
    authorizeRole("Seller"),
    acceptOrder
);

router.patch(
    "/:id/reject",
    verifyToken,
    authorizeRole("Seller"),
    rejectOrder
);

router.patch(
    "/:id/ship",
    verifyToken,
    authorizeRole("Seller"),
    shipOrder
);

router.patch(
    "/:id/deliver",
    verifyToken,
    authorizeRole("Seller"),
    deliverOrder
);

module.exports = router;