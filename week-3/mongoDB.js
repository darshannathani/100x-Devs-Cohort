const mongoose = require('mongoose');
const express = require('express');
const app = express();
mongoose.connect("mongodb+srv://darshannathani:goldenhour@100xdevs.stnucqu.mongodb.net/hello?retryWrites=true&w=majority");
const User = mongoose.model('users',{ name: String, email: String, password: String });
app.post("/signup",async function(req,res){
  
  const password = req.headers.password;
  const fname = req.headers.fname;
  const email = req.headers.email;
  const existinguser = await User.findOne({email:email});
  if(existinguser){
    return res.status(400).send("Email already exists");
  }
  const user = new User({
    name:fname,
    email:email,
    password:password
  });
  user.save();
  res.json({
    "msg": "user created successfully"
  })
})
app.listen(3000);

