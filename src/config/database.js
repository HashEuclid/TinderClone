const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    process.env.DB_CONNECTION_SECRET
  ); // connect to mongoose cluster
};

module.exports = connectDB;
