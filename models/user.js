const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();
const Joi = require ("joi");



const userSchema = new mongoose.Schema ({
 username:{
   type:String,
   lowercase:true,
   required:true,
   unique:true
 },
 password:{
   type:String,
   required:true
 },
 email:{
   type:String,
   lowercase:true,
   required:true,
   unique:true
 }
})



const User = new mongoose.model ("User", userSchema);



function validateUser(user) {
  const schema = {
    username: Joi.string().min(3).require(),
    password: Joi.string().min(3).require(),
    email: Joi.string().min(20).require(),
  };

  return Joi.validate(user, schema);
}


module.exports.validateUser = validateUser;
module.exports.User = User;
