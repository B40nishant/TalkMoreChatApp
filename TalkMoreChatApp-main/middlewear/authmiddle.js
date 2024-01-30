import jwt from 'jsonwebtoken';
const authmiddle = (req,res,next)=>{
  const token = req.header('token'); 
  if(!token){
     return res.status(401).json({message:"No Token "});
  }
    try {
      const data = jwt.verify(token,process.env.JWT_SECRET);
      req.user = data.user;
      next();
    } catch (error) {
      return res.status(401).json({message:"No Token ",success:true}); 
    }
}
export default authmiddle;
