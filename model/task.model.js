const mongoose = require('mongoose');

const taskSchema =  new mongoose.Schema({
    taskname: String,
    decs: String,
    priority:{
        type: String,
        enum : ["low", "medium", "high"],
        default: "low",
    },
    dueDate: Date,
    createdBy:{type: mongoose.Schema.Types.ObjectId, ref:"user"}
})

const task = mongoose.model("task", taskSchema)

module.exports ={task}