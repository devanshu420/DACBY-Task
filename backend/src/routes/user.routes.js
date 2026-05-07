const express = require("express");
const {
  registerUserController,
  loginUserController,
  getMeController,
  logoutController,
} = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// register user
router.post("/register", registerUserController);

// login user
router.post("/login", loginUserController);

// get me
router.get("/me", authMiddleware, getMeController);

// Logout
router.post("/logout", logoutController);

module.exports = router;
