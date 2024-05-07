const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userSchema");
require("dotenv").config();


// Register controller
const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Hast the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new userModel({
      fullName,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error", success: false });
  }
};

// Login controller 
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        // Find the user by email
        const user = await userModel.findOne({ email });
    
        if (!user) {
          return res.status(401).json({ error: "Invalid Email", success: false });
        }
    
        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if (!isPasswordValid) {
          return res
            .status(401)
            .json({ error: "Incorrect Password", success: false });
        }
    
        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
          expiresIn: "1h",
        });
        res.json({ token, message: "User logged in successfully", success: true });
      } catch (error) {
        console.error("Error logging in:", error); // Log detailed error message
        res
          .status(500)
          .json({ error: "Unexpected error. Please try again.", success: false });
      }
}

module.exports = {registerUser, loginUser}
