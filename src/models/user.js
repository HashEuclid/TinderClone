const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      index: true,
      minlength: 4,
      maxlength:50
    },
    lastName: {
      type: String,
      maxlength: 20,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,           // automatically creates the index of this field emailId i.e indexed query
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid EMail Address :" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong password :" + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: `{VALUE} is not a valid gender type`,
      },
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);


userSchema.index({firstName:1,lastName:1});

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: this }, "DEV@Tinder#790", {
    expiresIn: "7d",
  });
  return token;
};
userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};
module.exports = mongoose.model("User", userSchema);
