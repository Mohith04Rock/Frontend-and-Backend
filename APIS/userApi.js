//import mini express
const express=require("express")
//create userapp
const userApp = express.Router()
//import express-async-handler
const expressAsyncHandler=require("express-async-handler")
//import bcryptjs
const bcryptjs=require("bcryptjs")
//import model
const User =require("../models/User")
const Task = require("../models/Task")
const verifyToken = require("./middlewares/verifyToken")

const jwt=require("jsonwebtoken")
require("dotenv").config()

var cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const multer = require("multer")
//body parser middleware
userApp.use(express.json())



cloudinary.config({
    cloud_name:'dfg9mrvcm',
    api_key:'552412861398733',
    api_secret:'3QYLj_EdEpA_2hGOvj1iJh-bEwU'
})

const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:async(req,file)=>{
        return {
            folder:"CDB",
            public_id:file.fieldName+'-'+Date.now()
        }
    }
})

const upload = multer({storage:storage})










//provide route

//get user
userApp.get("/getuser",expressAsyncHandler(async(request,response)=>{






   /*  let userData= await User.find().exec()
    response.status(200).send({message:"User Data",payload:userData}) */
}))

//user login
userApp.post("/login",expressAsyncHandler(async(request,response)=>{

    //get user credentials
    let userCredentialObj = request.body
    //search for username in db
    let userObjFromDb= await User.findOne({username:userCredentialObj.username})
    //if not exist in db
    if(userObjFromDb==null){
        response.status(200).send({message:"Invalid Username"})
    }
    else{
        //verify password
        let status = await bcryptjs.compare(userCredentialObj.password,userObjFromDb.password)
        //if passwords not match
        if(status==false){
            response.status(200).send({message:"Invalid Password"})
        }
        else{
            //generate token for login success
            let signedToken= jwt.sign({username:userObjFromDb.username},process.env.SECRET_KEY,{expiresIn:100})
            response.status(200).send({message:"Login Success",token:signedToken,user:userObjFromDb})
        }
    }



}))

//get user using username
userApp.get("/getuser/:username",expressAsyncHandler(async(request,response)=>{
    
    //get username from url
    let usernameFromUrl=request.params.username
    //check in db for existence
    let userFromDb=await User.findOne({username:usernameFromUrl}).exec()
    //if not existed
    if(userFromDb==null){
        response.status(404).send({message:"User Not Found"})
    }
    else{
        response.status(302).send({message:"User Found",payload:userFromDb})
    }



   
   
   
    /*  let usernameFromClient = request.params.username
    let userData=await User.findOne({username:usernameFromClient})
    if(userData!==0){
        response.status(302).send({message:"User Found",payload:userData})
    }
    else{
        response.status(404).send({message:"No User Found"})
    } */
}))

//create user
userApp.post("/createuser",upload.single('photo'),expressAsyncHandler(async(request,response)=>{
    //img url returned from cloudinary
    let imgCdn = request.file.path
    //get userObj from client and convert to object
    let userObjFromClient = JSON.parse(request.body.userObj)
    //get data from client
    //let userObjFromClient=request.body
    //verify whether it exists in db
    let userObjFromDb=await User.findOne({username:userObjFromClient.username})
    //if exists
    if(userObjFromDb!==null){
        response.status(208).send({message:"User already existed"})
   }
   else{
       //add the image
       userObjFromClient.profileImage=imgCdn
       //create a user doc
       let userObj = new User({...userObjFromClient})
       //hash the password
       let hashedPassword=await bcryptjs.hash(userObjFromClient.password,5)
       userObj.password=hashedPassword
       //save
       let newUser = await userObj.save()
       //inform
       response.status(201).send({message:"User Created",payload:newUser})
   }
   
   
   
   
   
   
    /*  //get data from client
    let newUser=request.body
    //hash password
    let hashedPassword=await bcryptjs.hash(newUser.password,5)
    newUser.password=hashedPassword
    //create document
    let userDoc= new User({...newUser})
    //save the document
    await userDoc.save()
    //inform
    response.status(201).send({message:"User Created"}) */
}))

//update user
userApp.put("/updateuser",expressAsyncHandler(async(request,response)=>{
    
    //get data from client
    let updatedUserObj = request.body
    //find the user with data and update - findOneAndUpdate
    await User.findOneAndUpdate({username:updatedUserObj.username},{$set:{...updatedUserObj}})
    //send info
    response.status(205).send({message:"User Updated"})
   
   
   
   
    /*  //get the updated data from client
    let updatedUserData = request.body
    //get username of the user
    let usernameOfUser=updatedUserData.username
    //hash the password
    let hashedPassword=await bcryptjs.hash(updatedUserData.password,5)
    updatedUserData.password=hashedPassword
    //update the user
    await User.updateOne({username:usernameOfUser},updatedUserData)
    //inform
    response.status(205).send({message:"User Updated"}) */
}))

//delete user
userApp.put("/deleteuser",expressAsyncHandler(async(request,response)=>{
    
    //get the data from client
    let userObjFromClient = request.body
    //find the data and update status for delete
    await User.findOneAndUpdate({username:userObjFromClient.username},{$set:{status:userObjFromClient.status}})
    //send info
    response.status(401).send({message:"User Deleted"})
   


   
    /* //get the username from client
    let usernameToDelete = request.params.username
    //check if exist
    let userDataToDelete=await User.findOne({username:usernameToDelete})
    //check for existence
    if(userDataToDelete!==null){
        let success = await User.deleteOne({username:usernameToDelete})
        response.status(402).send({message:"User Deleted"})
    }
    else{
        response.status(404).send({message:"No User Exist"})
    } */
}))




userApp.post("/addtask",verifyToken,expressAsyncHandler(async(request,response)=>{
    //get the data from client
    let taskFromClient = request.body
    //console.log(taskFromClient.username)
    //check for username exist
    let userFromDb = await Task.findOne({username:taskFromClient.username})
    // console.log(userFromDb)
    //if not exist
    if(userFromDb==null){
        // response.send({message:"Not an authorised user"})
        let taskDoc = new Task({...taskFromClient})
        let newTask = await taskDoc.save()
        console.log(newTask)
    }
    //if exist
    else{
        let updatedTasks = userFromDb
        updatedTasks.taskList.push(taskFromClient.taskList[0])
        await Task.updateOne({username:taskFromClient.username},updatedTasks)
    }
}))


userApp.get("/viewtasks/:username",verifyToken,expressAsyncHandler(async(request,response)=>{
    //get the logged user
    let loggedUser = request.params.username
    //get data using usename
    let userTasksFromDb = await Task.findOne({username:loggedUser})
    //send the data if found
    if(userTasksFromDb!==null){
        response.status(200).send({message:"User Data",payload:userTasksFromDb.taskList})
    }
    else{
        response.send({message:"No user found"})
    }
}))







//path unavailabe middleware
userApp.use((request,response,next)=>{
    response.send({message:"Path Error",payload:`${request.url} not Found!`})
})

//error handling middleware
userApp.use((error,request,response,next)=>{
    response.send({message:"Error",payload:error.message})
})

//export
module.exports=userApp