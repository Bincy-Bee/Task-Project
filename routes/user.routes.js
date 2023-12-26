const {Router} = require('express');
const { signupForm, signup, loginForm, login,logout } = require('../controller/user.controller');
const userRouter = Router();

userRouter.get("/signup",signupForm);
userRouter.post("/signup",signup);
userRouter.get("/login",loginForm);
userRouter.post("/login",login);
userRouter.get("/logout",logout);

module.exports ={userRouter}