const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
   firstName: {
      type: String,
      required: [true, "Please enter a firstname"],
   },
   lastName: {
      type: String,
      required: [true, "Please enter a lastname"],
   },
   email: {
      type: String,
      required: [true, "Please enter an email"],
   },
   password: {
      type: String,
      required: [true, "Please enter a password"],
   },
});

// Encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
});


// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });

};


UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model("User", UserSchema);
