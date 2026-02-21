const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const USER=require('../models/user');


router.post("/register", async (req,res)=>{
  try{
     const {name,email,password}=req.body;
     const userExist=await USER.findOne({email});
     if(userExist)
       return res.status(400).json({ message: "User already exists"});

     const salt= await bcrypt.genSalt(10);
     const hashPassword= await bcrypt.hash(password,salt);

     const user= await USER.create({
        name,
        email,
        password:hashPassword
     });
     res.status(201).json({
      message:"user registered successfully"
     });
  
  }
  catch(err){
     res.status(500).json({error:err.message});
  }
 
});

router.post("/login",async (req,res)=>{
   try{
     const {email,password}=req.body;
     const userExist=await USER.findOne({email});
     if(!userExist) 
       return res.status(400).json({message:"Invalid credentials"});

     const matching=await bcrypt.compare(password,userExist.password);
     if(!matching)
       return res.status(400).json({message:"Invalid credentials"});

     const token = jwt.sign(
      { id: userExist._id },
      process.env.JWT_SECRET
    );
    res.cookie("token",token,{
      httpOnly:true,
      })
    res.json({
      message: "Login successful"
    });
     
   }
   catch(err){
      res.status(500).json({error:err.message});
   }
});

module.exports=router;