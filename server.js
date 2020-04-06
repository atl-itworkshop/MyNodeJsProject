const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const colors = require("colors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config({ path: "./config/config.env" });

// Connect to DB
connectDB();

// Route files
const products = require("./routes/products");
const auth = require("./routes/auth");
const products2 = require("./routes/products2");

const app = express();

// Body parser middleware
app.use(express.json());

// Cookie parser middleware
app.use(cookieParser());

// Enabling CORS for frontend browser request
app.use(cors());

// Logging middleware
app.use(morgan("combined"));

// Mount routers
app.use("/api/v1/products", products);
app.use("/api/v2/auth", auth);
app.use("/api/v2/products", products2);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.yellow));
