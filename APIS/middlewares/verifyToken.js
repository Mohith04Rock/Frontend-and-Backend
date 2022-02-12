//import jwt
const jwt = require("jsonwebtoken")
//import dotenv
require("dotenv").config()
//middleware to verify the token
const verifyToken=(request,response,next)=>{
    //get bearer token
    let bearerToken = request.headers.authorization
    //if undefined
    if(bearerToken==undefined){
        response.send({message:"Unauthorized Requests"})
    }
    //get token
    let token = bearerToken.split(" ")[1]
    try{
        //verify token with secret key
        jwt.verify(token,process.env.SECRET_KEY)
        //proceed if token is valid
        next()
    }
    catch(error){
        response.send({message:"Session expired..Please try to login again"})
    }    
}

//export
module.exports=verifyToken