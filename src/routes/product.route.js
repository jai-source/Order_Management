const express = require("express");
const router = express.Router();

const {
    createProduct,
    updateProduct,
    getAllProducts,
    getProductById,
    deleteProduct
} = require("../controllers/product.controller");

const verifyToken =
require("../middleware/auth.middleware");

const authorizeRole =
require("../middleware/role.middleware");

const validate =
require("../middleware/validation.middleware");

const {
    createProductSchema,
    updateProductSchema
} = require("../validation/product.validations");

router.post(
    "/",
    verifyToken,
    authorizeRole("Seller"),
    validate(createProductSchema),
    createProduct
);

router.put(
    "/:id",
    verifyToken,
    authorizeRole("Seller"),
    validate(updateProductSchema),
    updateProduct
);

router.delete(
    "/:id",
    verifyToken,
    authorizeRole("Seller"),
    deleteProduct
);

router.get(
    "/",
    getAllProducts
);

router.get(
    "/:id",
    getProductById
)

module.exports = router;