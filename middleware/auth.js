const jwt = require("jsonwebtoken");
const User = require("../model/User");

// Protect routes
exports.protect = async (req, res, next) => {
   let token;

   if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
   ) {
      token = req.headers.authorization.split(" ")[1];
   } 

   if (!token) {
    return res.status(401).json({success: false,  message: 'Invalid token...'});
   }


   // Verify token
   const decoded = jwt.verify(token, process.env.JWT_SECRET);
   console.log(decoded);

   req.user = await User.findById(decoded.id);

   next();
};
