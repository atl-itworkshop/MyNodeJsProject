const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const colors = require("colors");
const connectDB = require("./config/db");
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema.js');

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Load environment variables
dotenv.config({ path: "./config/config.env" });

// Connect to DB
connectDB();

// Route files
const products = require("./routes/products");

const app = express();

// Body parser middleware
app.use(express.json());

// Enabling CORS for frontend browser request
app.use(cors());

// Logging middleware
app.use(morgan("combined"));

// Mount routers
app.use("/api/v1/products", products);

const PORT = process.env.PORT || 5000;

server.applyMiddleware({app});

app.listen(PORT, console.log(`Server running on port ${PORT} - ${server.graphqlPath}`.yellow));
