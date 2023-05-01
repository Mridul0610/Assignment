let mongoose=require("mongoose");
let userSchema=new mongoose.Schema({
    name:String,
    age:Number,
    salary:String,
    email:String,
    department:String
})
let userModel=mongoose.model("user",userSchema,"user");
module.exports={userModel}