const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        trim: true,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        min:6,
        max:12
    },
    profile:{
        type:String,
        default:"avater.png"
    },
    phoneNumber:{
        type:String,
        
    }
});

const userModel = mongoose.model("User",userSchema);
module.exports=userModel;