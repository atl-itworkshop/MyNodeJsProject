const express = require("express");
const passport = require("passport");
const passportConf = require("../middleware/passport");
const { login, register, logout, facebook } = require("../controllers/auth");

const router = express.Router();

router.route("/login").post(login);

router.route("/register").post(register);

router.route("/facebook").post(passport.authenticate("facebookToken", {session: false}), facebook);

router.route("/logout").get(logout);

module.exports = router;
