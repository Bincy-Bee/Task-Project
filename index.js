const express =require('express');
const { connection } = require("./config/connection");
const { userRouter } = require('./routes/user.routes');
const cookie = require('cookie-parser');
const { taskRouter } = require('./routes/task.routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", __dirname +"/views")
app.use(express.static(__dirname + "/public"));
app.use(cookie());
app.use("/user",userRouter);
app.use("/task",taskRouter)



app.listen(8090,()=>{
    console.log('Server is listening in http://localhost:8090');
    connection();
})