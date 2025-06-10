const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://ash93singh:uAES889t92OSJLKe@nodecluster.ctqfmaq.mongodb.net/devTinder"
  ); // connect to mongoose cluster
};

module.exports = connectDB;
