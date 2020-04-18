const express = require("express");
const {getHealth} = require("../controllers/health");

const router = express.Router();

router
	.route("/ping")
	.get(getHealth);

module.exports = router;
