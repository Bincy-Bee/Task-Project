

const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next)=>{
    const {token}= req.cookies;
    if(token){
        let data = jwt.verify(token,"secret");
        if (data){
            req.user = data;
            next();
        }
        else{
            return res.send({message: 'Invalid token'})
        }
    }
    else{
        return res.redirect("/login")
    }
}
module.exports ={verifyToken}