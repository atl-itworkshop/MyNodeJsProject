const express = require("express");
const dotenv = require("dotenv");

// Route files
const products = require("./routes/products");

// Load environment variables
dotenv.config({ path: "./config/config.env" });

const app = express();

// Body parser
app.use(express.json());

// Mount routers
app.use("/api/v1/products", products);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
