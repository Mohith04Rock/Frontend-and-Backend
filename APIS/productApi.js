//import mini express
const express = require("express")
const productApp=express.Router()
//import
const expressAsyncHandler=require("express-async-handler")
const bcryptjs=require("bcryptjs")
const Product = require("../models/Product")

//body parser middleware
productApp.use(express.json())
//provide route

//get products
productApp.get("/getproduct",expressAsyncHandler(async(request,response)=>{
    //get data by calling find on model
    let productData=await Product.find()
    response.status(200).send({message:"Product Data",payload:productData})
}))

//get products using product name
productApp.get("/getproduct/:productName",expressAsyncHandler(async(request,response)=>{
    //get product name from client
    let productNameFromClient=request.params.productName
    //check for existence using findOne on model
    let productData=await Product.findOne({productName:productNameFromClient})
    //if exists
    if(productData!==null){
        response.status(302).send({message:"Product Found",payload:productData})
    }
    else{
        response.status(404).send({message:"No Product Found"})
    }
}))

//create products
productApp.post("/createproduct",expressAsyncHandler(async(request,response)=>{
    //get the product from client
    let newProduct = request.body
    //hash the product code
    let hashedProductCode= await bcryptjs.hash(newProduct.productCode,5)
    newProduct.productCode=hashedProductCode
    //create product doc
    let productDoc = new Product({...newProduct})
    //save the product doc
    await productDoc.save()
    //inform
    response.status(201).send({message:"Product Added"})
}))

//update products
productApp.put("/updateproduct",expressAsyncHandler(async(request,response)=>{
    //get the updated product from client
    let updatedProduct = request.body
    //hash the product code
    let hashProductCode= await bcryptjs.hash(updatedProduct.productCode,5)
    updatedProduct.productCode=hashProductCode
    //get the name of the product
    let productNameFromClient = updatedProduct.productName
    //check for existence
    let existingProduct= await Product.findOne({productName:productNameFromClient})
    await Product.updateOne({productName:productNameFromClient},updatedProduct)
    response.send({message:"Product Updated"})

}))
//delete products
productApp.delete("/delete/:productName",expressAsyncHandler(async(request,response)=>{
    //get the product name
    let productToDelete = request.params.productName
    //get the product data
    let productData = await Product.findOne({productName:productToDelete})
    //check for product existence
    if(productData!=null){
        let success=await Product.deleteOne({productName:productToDelete})
        response.status(401).send({message:"Product Deleted"})
    }
    else{
        response.status(404).send({message:"No Product Exist"})
    }
}))


//path unavailable middleware
productApp.use((request,response,next)=>{
    response.status(404).send({message:"Path Unavailable",payload:`${request.url} is not Found!`})
})
//error handling middleware
productApp.use((error,request,response,next)=>{
    response.status(404).send({message:"Error",payload:error.message})
})
//export 
module.exports=productApp
