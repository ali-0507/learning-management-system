const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");


const app = express();

app.use(express.json());
app.use(cookieParser());


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
 })
);


app.get("/api/test", (req, res) =>{
    res.status(200).json({
        success: true,
        message: "Server is running",
    });
});

module.exports = app;