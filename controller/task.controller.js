const { task } = require("../model/task.model");

const taskpage = (req,res)=>{
    res.render("taskform")
}
const taskdata= async (req,res)=>{
    try {
        let createdBy = req.user.id;
        req.body.createdBy = createdBy;
        let data = await task.create(req.body);
        res.send({meassge:'TaskAssigned', recipient:data})
        
    } catch (error) {
        return res.send({Error : error.message});
    }
}
const tasklist = (req,res)=>{
    res.render('tasklist',{edit:false})
}
const alltasks = async(req,res)=>{
    try {
        
        let data = await task.find();
        res.send(data)
    } catch (error) {
        return res.send({Error : error.message});
    }
}
const mytaskpage = (req,res)=>{
    res.render("mytask")
}
const taskuser= async(req,res)=>{
    try {
        let id = req.user.id;
        let data = await task.find({createdBy:id});
        res.send(data);
    } catch (error) {
        return res.send({Error : error.message});
    }
}

const taskDel= async(req,res)=>{
    try {
        let {id} = req.params;
        console.log(id)
       let data = await task.findByIdAndDelete(id);
       res.send(data)
    } catch (error) {
        return res.send({Error : error.message});
    }
}

const taskupdate = async (req, res) => {
    try {
        let {id} = req.params;
        let data = await task.findById(id)
        res.render('taskform',{data, edit:true});
    } catch (error) {
        return res.send({Error : error.message});
    }
}
const taskup = async(req,res)=>{
    try {
        
        let {id} = req.params;
        let data= await task.findByIdAndUpdate(id,req.body)
        res.send(data)
        
    } catch (error) {
        return res.send({Error : error.message});
    }
}
module.exports ={taskpage, taskdata, alltasks, tasklist, taskuser, mytaskpage, taskDel, taskupdate, taskup}