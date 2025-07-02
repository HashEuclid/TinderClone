const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user")

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/status/:toUserId",
  userAuth,
  async (req, res) => {
    // sending a connection request
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;
      

      const allowedStatus = ["ignored", "interested"];

      const toUser = await User.findById(toUserId);

    //   If the random userId is used for sending the connecton request
      if(!toUser) {
        return res.status(400).json({message:"User not found!"})
      }
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "Invalid status type" + status,
        });
      }

      //  If there is an exixting ConnectionRequest
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          {fromUserId,toUserId},
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if(existingConnectionRequest) {
        return res.status(400).json({message: "Connection request already exixts!!"})
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save(); // save into the DB
      res.json({
        message: req.user.firstName + status + toUser.firstName,
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);
module.exports = requestRouter;
