const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  //  Read the token from the request cookies
  try {
    const { token } = req.cookies;
    if(!token) {
      return res.status(401).send("Please login");
    }
    const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next(); // called to move to the request handler
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
  
};
module.exports = {
  userAuth,
};
