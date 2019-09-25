const {User} = require("../models/user.js")
const mongoose = require("mongoose");
const express = require('express');
const bcrypt = require("bcryptjs");
const router = express.Router();


router.post('/',  (req, res) => {
  const user = new User ();
  user.username = req.body.username;
  user.password = req.body.password;
  user.email = req.body.email;

  //HASH PASSWORD
  bcrypt.genSalt(10,(err, salt)=>{bcrypt.hash(user.password,salt, (err, hash)=>{
   if (err)throw err;
   //SET PASWWORD TO HASH
   user.password = hash;
   //SAVE USER
   user.save()
   .then(user=>{
     res.send("User Created")
   })
   .catch(err=>console.log(err.message, "Invalid UserName or Password"))
 })})// ******** End Here - HASH PASSWORD


});





module.exports = router;
