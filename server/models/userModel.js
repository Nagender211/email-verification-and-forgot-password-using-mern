const mongoose=require("mongoose");

const useSchema= new mongoose.Schema({
   
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    otp: {
        type: Number
    }
   
   
    

});

const User=mongoose.model("User",useSchema);

module.exports=User;