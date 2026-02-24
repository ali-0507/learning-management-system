const express = require("express");
const router =  express.Router();
const {registerUser, loginUser, getMe, logout} = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe)
router.post("/logout", logout);

module.exports = router;