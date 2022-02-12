//import mongoose
const mongoose = require("mongoose")

//create schema
const userSchema = new mongoose.Schema({
    username:{
        type:String,required:[true,"Username is required"],
        minlength:[4,"Min length of username should be 4"]
    },
    password:{type:String,required:[true,"Password is required"]},
    email:{type:String,required:[true,"Email is required"]},
    city:{type:String,required:[true,"City is required"]},
    profileImage:String,
    status:{type:Boolean,default:true}
},{collection:'usercollection'})

//create model
const userModel = mongoose.model("user",userSchema)

//export model
module.exports=userModel