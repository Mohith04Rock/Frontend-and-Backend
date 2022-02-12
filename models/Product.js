//import mongoose
const mongoose = require("mongoose")
//create product schema
const productSchema= new mongoose.Schema({
    productName:{type:String,required:true},
    productCode:{type:String,required:true},
    productBrand:String,
    rating:Number,
    cost:Number    
})
//create product model
const productModel = mongoose.model("productcollection",productSchema)
//export product model
module.exports=productModel