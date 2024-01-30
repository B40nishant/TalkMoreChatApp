import mongoose from "mongoose";
 const conndb =async()=>{
    try {
     await mongoose.connect(process.env.MONGODB,{
        useNewUrlParser:true,
        useUnifiedTopology:true
     });
     console.log('Database is connected'); 
    } catch (error) {
        console.log(error.message);
    }
 }


 export default conndb; 