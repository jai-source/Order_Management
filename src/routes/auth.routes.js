const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth.middleware");

router.get("/profile", verifyToken, (req, res) => {
  res.json({
    user: req.user
  });
});
const {
  register,
  login
} = require("../controllers/auth.controller");

router.post("/register", register);
router.post("/login" , login);

module.exports = router;