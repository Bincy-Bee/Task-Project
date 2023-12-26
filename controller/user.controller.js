const { user } = require("../model/user.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const signupForm = (req,res)=>{
    res.render("signup");
}
const signup=async(req,res)=>{
    try {
        let {username, password, email, role} = req.body;
        let data = await user.findOne({email:email});
        if(data){
            return res.send({message: 'user already exist'})
        }
        else{
            bcrypt.hash(password, 5, async(err, hash)=>{
                if(err){
                    return res.send({Error: err.message});
                }
                else{
                    let obj={
                        email:email, password:hash, username:username, role:role
                    }
                    let data = await user.create(obj);
                    let token = jwt.sign({id :data._id, role: data.role}, "secret");
                    return res.cookie("token", token).cookie("role", data.role).send({message:"Signup successful", data: data});
                }
            })
        }        
    } catch (error) {
        return res.send({Error : error.message});
    }
}
const loginForm = (req,res)=>{
    res.render("login");
}
const login = async(req,res)=>{
    try {
        let {password, email} = req.body;
        let data = await user.findOne({email:email});
        if(data){
            bcrypt.compare(password, data.password, async(err, result)=>{
                if(err){
                    return res.send({Error: err.message})
                }
                else if(result){
                    let token = jwt.sign({id :data._id, role: data.role}, "secret");
                    return res.cookie("token", token).cookie("role", data.role).send({message:"Login successful", data: data}); 
                }
                else{
                    return res.send({message:'Password mismatch'})
                }
            })
        }
        else{
            return res.send({message:'User not found'})
        }
        
    } catch (error) {
        return res.send({Error : error.message});
    }
}
const logout= (req,res)=>{
    res.clearCookie("token").clearCookie("role").redirect("/user/login");
}

module.exports = {signupForm, signup, loginForm, login, logout}