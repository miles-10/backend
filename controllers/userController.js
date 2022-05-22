const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken.js");
const User = require("../models/userModel.js");

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({
      success: false,
      msg: "Unauthorized user",
    });
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res, next) => {
  console.log(req.body);

  const { firstName, lastName, userName, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({
      success: false,
      msg: "Entered email id already registered with us. Login to continue",
    });
  }

  const user = new User({
    firstName,
    lastName,
    userName,
    email,
    password,
  });

  // save user object
  user.save(function (err, user) {
    if (err) return next(err);
    res.status(201).json({
      success: true,
      msg: "Account Created Sucessfully. Please log in.",
    });
  });
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

module.exports = {
  authUser,
  registerUser,
  getUsers,
};
