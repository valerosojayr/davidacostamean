const express = require ("express");
const morgan = require("morgan");
const mongoose = require ("mongoose");
const users = require('./routes/users.js');
const home = require('./routes/index.js');
const path = require ("path");
const Joi = require ("joi");

const app =  express();
//Middleware
app.use (morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use ("/public", express.static(path.join(__dirname,"public")));

//ROUTES
app.use('/api/users', users);

//Home Route
app.get("*", (req, res)=>{
res.sendFile(path.join(__dirname + "/public/app/views/index.html"))
});



mongoose.connect("mongodb://localhost:27017/tutorial")
.then(()=>{console.log("Connected to Database")} )
.catch( (err)=>{console.log (err.message + "Unable to Connect to Database")})




const port = process.env.PORT || 3000;

app.listen (port, ()=>{
  console.log(`Listening to Port${port}. Server Connected.`);
});
