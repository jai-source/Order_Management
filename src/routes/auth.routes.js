const express = require("express");
const router = express.Router();
const authorizeRole = require("../middleware/role.middleware");
const verifyToken = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");

const {
  registerSchema,
  loginSchema
} = require("../validation/validations");



router.get(
    "/seller",
    verifyToken,
    authorizeRole("Seller"),
    (req, res) => {

        res.json({
            message: "Welcome Seller"
        });

    }
);

router.get(
    "/buyer",
    verifyToken,
    authorizeRole("Buyer"),
    (req, res) => {

        res.json({
            message: "Welcome Buyer"
        });

    }
);

const {
  register,
  login,
  profile
} = require("../controllers/auth.controller");



router.get("/profile", verifyToken, profile);


router.post(
  "/register",
  validate(registerSchema),
  register
);

router.post(
  "/login",
  validate(loginSchema),
  login
);

module.exports = router;
