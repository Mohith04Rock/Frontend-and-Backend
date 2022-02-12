//import mongoose
const mongoose = require("mongoose")

//create task schema
const taskSchema = new mongoose.Schema({
    username:{type:String,required:true},
    taskList:{type:Array,required:true}
})

//create task model
const taskModel = mongoose.model("taskcollection",taskSchema)

//export model
module.exports = taskModel