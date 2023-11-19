const profileRoute = require("express").Router();
const verifyToken = require("../../middleware/tokenverify");
const User = require("../../models/userModels");
const bcrypt = require("bcrypt");
profileRoute.put("/",verifyToken,async(req,res)=>{
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).send("User Not Found");
    
        }
        const { password, phoneNumber } = req.body;
        const hashpassword = await bcrypt.hash(password,11);
        const userId = req.userId;
        const updateduser = await User.findByIdAndUpdate(userId, { password:hashpassword,phoneNumber }, { new: true });

        if (!updateduser) {
            return res.status(404).send("Not Updated");
        }

        res.status(200).json({ updatedUser: updateduser });

    } catch (error) {
        console.log(error);
    }



});


module.exports = profileRoute;
