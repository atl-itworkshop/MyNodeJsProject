const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config({ path: "./config/config.env" });

// Connect to DB
connectDB();

// Route files
const products = require("./routes/products");

const app = express();

// Body parser middleware
app.use(express.json());

// Logging middleware
app.use(morgan("combined"));

// Mount routers
app.use("/api/v1/products", products);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.yellow));
