const express = require("express");
const data = require('../models/userSchema')
const router = express.Router()
const bcrypt = require("bcrypt");
router.use(express.json())
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = "SECRET";


router.post("/",async(req,res)=>{
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;
    if(password != confirm_password) return res.status(400).json({message:"Password doesnot match"});

    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(req.body.password,salt)   

    await data.create({
        email:req.body.email,
        password:hash
    });

    const userData = await data.findOne({mailid:req.body.mailid})
    const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: userData._id
      }, secret);
    res.status(200).json({status:"Success",token:token});
})


module.exports = router