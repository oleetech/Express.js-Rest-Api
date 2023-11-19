const mongoose = require("mongoose");

const connectToDatabase = async ()=>{
    try {
        mongoose.connect(process.env.DATABASE_URI);
        console.log("database connected");
    } catch (error) {
        console.log("Database Connection Failed");
    }
};

module.exports = {connectToDatabase}