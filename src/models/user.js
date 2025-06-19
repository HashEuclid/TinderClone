const mongoose = require("mongoose");
const validator = require('validator');

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
    validate(value) {
      if(!validator.isEmail(value)) {
        throw new Error("Invalid EMail Address :"+value)
      }
    }
  },
  password: {
    type: String,
    required : true,
    minlength: 8,
    maxlength: 15,
    validate(value) {
      if(!validator.isStrongPassword(value)) {
        throw new Error("Enter a strong password :"+value)
      }
    }
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
  skills:{
    type: [String],
  }
},{timestamps: true});


module.exports = mongoose.model("User",userSchema);;