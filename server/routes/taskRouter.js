const express = require("express");
const taskRouter = express.Router();
const {
    createTask,
    viewTask,
} = require("../controllers/taskController");

taskRouter.post("/task/create", createTask);
taskRouter.get("/task/view", viewTask)

module.exports = taskRouter;