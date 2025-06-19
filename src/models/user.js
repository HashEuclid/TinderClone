const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required : true,
    minlength: 4,
  },
  lastName: {
    type: String,
    maxlength: 20,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required : true,
    minlength: 8,
    maxlength: 15,
  },
  age: {
    type: Number,
    min: 18,
  },
  gender: {
    type: String,
    validate(value){
      if(!["male","female","others"].includes(value)) {
        throw new Error("Gender data is not valid");
      }
    }
  },
},{timestamps: true});


module.exports = mongoose.model("User",userSchema);;