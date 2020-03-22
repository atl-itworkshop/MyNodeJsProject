const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: [true, "Please enter a price"]
    },
    color: {
        type: String,
        required: [true, "Please enter a color"]
    },
    type: {
        type: String,
        required: [true, "Please enter a color"]
    },
    gender: {
        type: String,
        enum: ["male", "female", "unisex"],
        required: [true, "Please enter a gender"]
    },
    title: String,
    company: String,
    about: String
});


module.exports = mongoose.model("Product", ProductSchema);

