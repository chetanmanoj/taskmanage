const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Mongodb Connected...");
  })
  .catch((err) => console.log("Error in connecting DB", err));
