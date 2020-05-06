const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const FbUserSchema = new mongoose.Schema({
   id: {
      type: String,
      required: true
   },
   firstName: {
      type: String,
      required: [true, "Please enter a first name"],
   },
   lastName: {
      type: String,
      required: [true, "Please enter a last name"],
   },
   email: {
      type: String,
      required: [true, "Please enter an email"],
   }
});


// Sign JWT and return
FbUserSchema.methods.getSignedJwtToken = function () {
   return jwt.sign(
      {
         id: this._id,
         name: this.firstName,
         email: this.email,
      },
      process.env.JWT_SECRET,
      {
         expiresIn: process.env.JWT_EXPIRE,
      }
   );
};

module.exports = mongoose.model("FbUser", FbUserSchema);
