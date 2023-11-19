const loginRoute = require("express").Router();

const User = require("../../models/userModels");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
loginRoute.post("/", async(req,res,next)=>{

    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if (!user) {
            res.status(401).json({message:"Wrong Credential"});
        }
        const validatePassword = await bcrypt.compare(password,user.password);

        if (!validatePassword) {
            return res.status(400).json({message:"pasword Does't match"});
        }
        const token = jwt.sign({userId:user.id},process.env.JWT_SECRET,{expiresIn:"2h",});
        res.set('Authorization', `Bearer ${token}`);

        res.status(201).json({token}) ;
    } catch (error) {
        
    }

});


module.exports = loginRoute;