const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.protect = async (req, res, next) => {
   try{
     const token = req.cookies.token;
     
     if(!token){
        return res.status(401).json({
            success: false,
            message: "Unauthorized, token missing"
        });
     }

     const decoded = jwt.verify(token, process.env.JWT_SECRET);

     const user = await User.findById(decoded.id).select("-password");

     if(!user){
        return res.status(401).json({
            success: false,
            message:"User not found",
        });
     }

     req.user = user;
     next();
   }catch(err){
    return res.status(401).json({
       success: false,
       message: "Unauthorized, invalid token",
    });
   }
};