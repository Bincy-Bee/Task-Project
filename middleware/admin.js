

const jwt = require('jsonwebtoken');

const isAdmin = (req,res,next)=>{
    const {token}= req.cookies;
    if(token){
        let data = jwt.verify(token,"secret");
        if (data.role == "admin"){
            req.user = data;
            next();
        }
        else{
            return res.send({message: 'You are not allowed to this page'})
        }
    }
    else{
        return res.redirect("/login")
    }
}
module.exports ={isAdmin}