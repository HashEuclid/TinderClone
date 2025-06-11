const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");

app.use(express.json());

// Create a POST API
app.post("/signup", async (req, res) => {
  // Creating a new instance of User Model
  const user = new User(req.body);

  try {
    await user.save(); // Data will be s aved to Database
    res.send("User added succesfully");
  } catch (err) {
    res.status(400).send("Error saving the user: ", err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Cluster connection established....");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777");
    });
  })
  .catch((err) => {
    console.log("Database can not be connected");
  });
