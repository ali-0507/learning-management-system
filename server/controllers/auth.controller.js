const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const generateToken = (userId) => {
    return jwt.sign({id: userId}, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};


exports.registerUser = async (req, res) => {
    try{
       const {name, email, password, role} = req.body;

       if(!name || !email || !password || !role){
         return res.status(400).json({
            success: false,
            message: "All fields are required",
         });
       }

    const existingUser = await User.findOne({ email });
    
    if(existingUser) {
        return res.status(400).json({
            success: false,
            message: "Email already registered",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
    });

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });

    }catch(error){
       res.status(500).json({
        success: false,
        message: "Server error"
       });
    }
};



exports.loginUser = async (req, res) => {
    try{
       const {email, password} = req.body;

       if(!email || !password){
          return res.status(400).json({
            success: false,
            message: "Email and password are required"
          });
       }

       const user = await User.findOne({ email });

       if(!user){
        return res.status(400).json({
            success: false,
            message: "Invalid credentials",
        });
       }

       const isMatch = await bcrypt.compare(password, user.password);

       if(!isMatch){
         return res.status(400).json({
            success: false,
            message: "Invalid credentials",
         })
       }

       const token = generateToken(user._id);

       res.cookie("token", token, {
         httpOnly: true,
         secure: false,   // set true in production time
         sameSite: "lax",
         maxAge: 24 * 60 * 60 * 1000,
       });

       res.status(200).json({
         success: true,
         message: "Login successful",
         data: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
         },
       });
    }catch(err){
         res.status(500).json({
            success: false,
            message: "Server error",
         });
    }
};