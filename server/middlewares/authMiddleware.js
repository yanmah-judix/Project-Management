const jwt=require('jsonwebtoken');

function authMiddleware(req,res,next){
   const token = req.cookies.token;   // read token from cookie
  console.log("Token from cookie:", token);
    if (!token)
    return res.status(401).json({ message: "No token, access denied" });
  

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;   
    next();
  } 
  catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
    
}
module.exports=authMiddleware;