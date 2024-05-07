const taskModel = require("../models/taskSchema");
const userModel = require("../models/userSchema")

const createTask = async (req, res) => {
  try {
    const { userId, title, description, duedate } = req.body;

    // Find the user by ID
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found", success: false });
    }

    // Create a new tak for that user
    const newTask = new taskModel({
      user: userId,
      title,
      description,
      duedate,
    });

    // Save the new task to the database
    await newTask.save();

    res
      .status(201)
      .json({ message: "Task created successfully", success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error", success: false });
  }
};

module.exports = {createTask };
