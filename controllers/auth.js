const User = require("../model/User");
const FbUser = require("../model/FbUser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fbconfig = require("../config/fbconfig");
const passport = require("passport");

// @desc    Register a user
// @route   POST /api/v2/auth/register
// @access  public
exports.register = async (req, res, next) => {
   const { firstName, lastName, email, password } = req.body;

   // Create user
   const user = await User.create({
      firstName,
      lastName,
      email,
      password,
   });

   sendTokenResponse(user, 201, res);
};

// @desc    Login a user
// @route   POST /api/v2/auth/login
// @access  public
exports.login = async (req, res, next) => {
   const { email, password } = req.body;

   const user = await User.findOne({ email });

   if (!user) {
      return res
         .status(401)
         .json({ success: false, message: "Invalid credentials..." });
   }

   // Check if password matches
   const isMatch = await user.matchPassword(password);

   if (!isMatch) {
      return res
         .status(401)
         .json({ success: false, message: "Invalid credentials..." });
   }

   sendTokenResponse(user, 200, res);
};

// @desc    Facebook Authenticate
// @route   POST /api/v2/auth/facebook
// @access  public
exports.facebook = async (req, res, next) => {
   console.log("Entering auth controller: POST /api/v2/auth/facebook");
   console.log("req.user", req.user);

   const user = await FbUser.findOne({ id: req.user.id });

   sendTokenResponse(user, 200, res);
};

// @desc    Logout a user
// @route   GET /api/v2/auth/logout
// @access  public
exports.logout = async (req, res, next) => {
   const options = {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
   };

   res.status(200)
      .cookie("token", "none", options)
      .json({ success: true, data: {} });
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
   // Create token
   const token = user.getSignedJwtToken();

   const options = {
      expires: new Date(
         Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
   };

   if (process.env.NODE_ENV === "production") {
      options.secure = true;
   }

   res.status(statusCode)
      .cookie("token", token, options)
      .json({ success: true, token });
};
