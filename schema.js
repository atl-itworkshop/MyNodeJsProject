const { gql } = require('apollo-server-express');
const axios = require("axios");

exports.typeDefs = gql `
    type Query {
        getProducts: [Product]
    }
    type Product {
        price: Int
        color: String
        title: String
    }
`;

exports.resolvers = {
    Query: {
        async getProducts(parent, args, context, info) {
            let response = await axios.get("http://localhost:5000/api/v1/products");
            return response.data.data;
        }
    }
}