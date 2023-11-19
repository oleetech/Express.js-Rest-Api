const express = require("express");
const app = express();
const bodyParser = require('body-parser');
// parse application/json
app.use(bodyParser.json())
require("dotenv").config();
const { connectToDatabase } = require("./database"); 
const port = process.env.PORT || 4000;
const signUpRoutes = require('./routes/auth/signupRoute');
const loginRoute = require('./routes/auth/loginRoute');
const profileRoute = require('./routes/auth/profileRoute');
const postRoute = require('./routes/postRoute');
const categoryRoute = require('./routes/categoryRoute'); // Add this line
const path = require('path');
const fs = require('fs');
app.use("/api/signup",signUpRoutes);
app.use("/api/login",loginRoute);
app.use("/api/profileupdate",profileRoute);

app.use("/api/post",postRoute);
app.use('/api/category', categoryRoute); // Add this line

app.get("/",(req,res)=>{
    res.send("Hello World");

});
app.listen(port,()=>{
    console.log("PORT:", process.env.PORT);

    console.log("application start");
    connectToDatabase();
})