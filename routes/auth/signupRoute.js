const signUpRoutes= require("express").Router();
const User = require("../../models/userModels");
const bcrypt = require('bcrypt');

signUpRoutes.post("/", async(req,res,next)=>{

    const {username,email,password} = req.body;


    try {

        const hashpassword = await bcrypt.hash(password,11);
        const user = await User.create({
            username,
            email,
            password:hashpassword,
        });

        res.status(201).json({message:"Account Created Successfull"});
    } catch (error) {
        res.status(401).json({message: "something Went Wrong"});
    }



    
    next();

});

module.exports = signUpRoutes;