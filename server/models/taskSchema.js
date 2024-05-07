const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duedate: { type: Date, required: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
});

const taskModel = mongoose.model("task", taskSchema);
module.exports = taskModel;
