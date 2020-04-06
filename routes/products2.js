const express = require("express");
const {getProducts, getProduct, addProduct, updateProduct, deleteProduct} = require("../controllers/products2");
const { protect } = require("../middleware/auth");

const router = express.Router();

router
	.route("/")
	.get(getProducts)
	.post(protect, addProduct);
	
	
router
	.route("/:id")
	.get(getProduct)
	.put(protect, updateProduct)
	.delete(protect, deleteProduct);

module.exports = router;
