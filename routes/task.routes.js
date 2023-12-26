const {Router} = require('express');
const { taskpage, taskdata, alltasks, tasklist, taskuser, mytaskpage, taskDel, taskupdate, taskup } = require('../controller/task.controller');
const { isAdmin } = require('../middleware/admin');
const { verifyToken } = require('../middleware/auth');
const taskRouter = Router();

taskRouter.get("/taskpage", taskpage);
taskRouter.post("/taskpage",verifyToken, taskdata);
taskRouter.get("/tasks",isAdmin,alltasks);
taskRouter.get("/mytaskpage", mytaskpage );
taskRouter.get("/mytask",verifyToken,taskuser);
taskRouter.get("/tasklist", tasklist);
taskRouter.delete("/mytaskdel/:id",isAdmin,taskDel);
taskRouter.get("/mytaskupdate/:id",taskupdate);
taskRouter.patch("/mytaskupdate/:id",taskup);


module.exports ={taskRouter}