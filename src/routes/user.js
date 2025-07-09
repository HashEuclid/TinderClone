const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName age skills";

// Get all the pending connection requests for the loggedIn user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequestModel.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);
    //  }).populate("fromUserId",["firstName","LastName"]);

    res.json({ message: "Data fetched succesfully", data: connectionRequest });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

userRouter.get("user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequestModel.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA);

    const data = connectionRequest.map((row) => {
        if(row.fromUserId._id.toString() ==  loggedInUser._id.toString()) {
           return row.toUserId;
        }
        return row.fromUserId;
    });

    res.json({data: data});
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = userRouter;
