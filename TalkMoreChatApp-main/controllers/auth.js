import User from '../models/Userdata.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userRegister = async(req,res,next)=>{
    try {
    const {name,email,password,pic} = req.body; 
   const user = await User.findOne({email});
   if(!user) {
     const hhh = new User({
           name,email,password,pic
       });
     await hhh.save(err=>{
       if(!err){
         return res.status(201).json({
               message:'Registerd Successfully',
               success:true
           });
       }
       else{
        return res.status(401).json({
               message:'Invalid Credential',
               success:false
           });
        
       }
     });
   }
   else{
      return res.status().json({
            message:"Invalid Credential / User Exist",
            success:false
        });
   }
    } catch (error) {
      console.log(error);
    }
}



const userlogin = async(req,res,next)=>{
    try {
           const {email,password} = req.body; 
   const user = await User.findOne({email});
   if(!user) return res.status(400).json({message:"Invalid Credential !",success:false});
  const isit =  await bcrypt.compare(password,user.password);

   if(!isit) return res.status(400).json({
    message:"Invalid Credentail"
    ,success:false
   });
  const data = {
    user:{
      id:user.id
    }
  }
  const token = jwt.sign(data,process.env.JWT_SECRET); 
  res.status(201).json({
    message:"Login Successfully",
    success:true,
     _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
    token:token,
  });
    } catch (error) {
      console.log(error);
    }
};



const allUsers = async(req,res,next) =>{
  const keyword = req.query.search ?{
     $or:[
      {name:{$regex:req.query.search,$options:"i"}},
      {email:{$regex:req.query.search,$options:"i"}},
     ]
  }:{};
  const usres = await (await User.find(keyword));
   res.status(201).json(usres); 
}

export {userRegister,userlogin,allUsers}; 