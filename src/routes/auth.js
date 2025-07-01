// # authRouter
// - POST /signup
// - POST /login
// - POST /logout

const express = require('express');
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    // Validation of data
    validateSignUpData(req);

    const { firstName,lastName,emailId,password } = req.body;

    // Encypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log("passwordHash" + passwordHash);

    // Creating a new instance of User Model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save(); // Data will be saved to Database
    res.send("User added succesfully");
  } catch (err) {
    console.log(err);
    res.status(400).send("ERROR : ", err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    // if (validator.isEmail(emailId)) {
    // }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      //  write the logic of Cookie
      // Create a JWT token
      const token = await user.getJWT();

      // Add the token to cookie and send the response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() +8*360000)
      });
      res.send("Login Succesfull");
    } else {
      throw new Error("invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});



module.exports = authRouter;