const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"], // Schema level validation
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);

// ConnectionRequest.find({fromUserId: 23263729624532780, toUserId:98967r53247689708})
connectionRequestSchema.index({fromUserId:1, toUserId:1 });

// this will be called everytime a connection request is saved 
// or
//  whenever the save method is called in(await connectionRequest.save()) in request.js file
connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  // Check if the fromUserId is same as toUserId 
  // or 
  // we can check this condition on Api level in request.js file
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Can not send connection request to yourself!");
  }
  next();
});

const ConnectionRequestModel = new mongoose.model(
  "ConnecionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequestModel;
