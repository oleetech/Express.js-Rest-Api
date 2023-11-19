const express = require("express");
const jwt = require("jsonwebtoken");

const verifyToken = async(req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).send("Unauthorised");
    }

    try {
        const decodeToken = jwt.verify(token,process.env.JWT_SECRET);
        req.userId = decodeToken.userId;
        next();
    } catch (error) {
        return res.status(403).send("invalid token");
    }
}

module.exports = verifyToken;

