const express = require("express");
const router = express.Router();
const {
  authUser,
  registerUser,
  getUsers,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware.js");

router.route("/").post(registerUser).get(protect, getUsers);
router.route("/login").post(authUser);

module.exports = router;
