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

//  GET user by email
app.get("/user", async (req, res) => {
  try {
    const user = await User.findOne({ emailId: req.body.emailId });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
    // const users = await User.find({ emailId: req.body.emailId });
    // if (users.length === 0) {
    //   res.status(404).send("User not found");
    // } else {
    //   res.send(users);
    // }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// FEED API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// DELETE a user from the database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted Succesfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// Update data of a user
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const user = await User.findByIdAndUpdate({_id: userId},data,{
      returnDocument: "after",
      runValidators: true,
    });
    res.send("User Updated Succesfully")
  } catch (err) {
    res.status(400).send("Update failed : "+ err.message);
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
