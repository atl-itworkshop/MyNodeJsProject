const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const Product = require("./model/Product");

mongoose.connect(process.env.MONGODB_URI, {
   useNewUrlParser: true,
   useCreateIndex: true,
   useFindAndModify: false,
   useUnifiedTopology: true
});

const products = JSON.parse(
   fs.readFileSync(`${__dirname}/data/products.json`, "utf-8")
);

const importData = async () => {
   await Product.create(products);
   console.log("Data imported...".green.inverse);
   process.exit();
};

const deleteData = async () => {
   await Product.deleteMany();
   console.log("Data deleted...".red.inverse);
   process.exit();
};

if (process.argv[2] === "-i") {
   importData();
} else if (process.argv[2] === "-d") {
   deleteData();
}
