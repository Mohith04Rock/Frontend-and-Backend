//import express
const express = require("express")
const app = express()
//import env file
require("dotenv").config()
//import apis
const userApp = require("./APIS/userApi")
const productApp = require("./APIS/productApi")

const path = require("path")
//import mongoose
const mongoose = require("mongoose")

app.use(express.static(path.join(__dirname,'./dist/fourteenth')))

//get dburl
const dbConnectionUrl=process.env.DATABASE_URL
//connect mongoose
mongoose.connect(dbConnectionUrl)
.then(()=>console.log("DB connection established..."))
.catch(err=>console.log("Error",err.message))

//execute based on match
app.use("/user",userApp)
app.use("/product",productApp)

//catch the route
app.get("*",(request,response,next)=>{
    response.sendFile(path.join(__dirname,'dist/fourteenth/index.html'))
})

//assign port
const PORT = process.env.PORT
app.listen(PORT,()=>console.log(`Web Server actively listening on ${PORT}...`))