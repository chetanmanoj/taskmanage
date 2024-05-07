const express = require("express");
const taskRouter = express.Router();
const {
    createTask,
} = require("../controllers/taskController");

taskRouter.post("/task/create", createTask);

module.exports = taskRouter;