const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const USER=require("./models/user");
require("dotenv").config();

const app = express();

//mongodb connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());



//  routes
app.get("/health", (req, res) => {
  res.json({ status: "Active" });
});

app.post("/register", async (req,res)=>{
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

app.post("/login",async (req,res)=>{
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

    res.json({
      message: "Login successful",
      token
    });
     
   }
   catch(err){
      res.status(500).json({error:err.message});
   }
});


//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
