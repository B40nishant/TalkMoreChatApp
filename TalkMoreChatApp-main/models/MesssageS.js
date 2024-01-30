import  mongoose from 'mongoose'; 
const shcema = mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
            ref:"User",
    },
    content:{
        type:String,
        trim :true
    },
    chat:{
        type:mongoose.Schema.Types.ObjectId,
            ref:"Chat",
    },
   
});

const MesssageS = mongoose.model('Message',shcema); 
export default MesssageS; 

