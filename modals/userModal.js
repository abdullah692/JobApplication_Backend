const mongoose = require("mongoose");
const validator=require("validator")


const UserModal = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Username is Required"],
      minLength: [3, "Name must contain at least 3 Characters!"],
      maxLength: [30, "Name cannot exceed 30 Characters!"],
    },
    email: {
      type: String,
      required: [true, "Please enter your Email!"],
      validate: [validator.isEmail, "Please provide a valid Email!"],
    },
    password: {
      type: String,
      required: [true, "User Password is required"],
      minLength: [6, "Password must contain at least 6 characters!"],
      maxLength: [32, "Password cannot exceed 32 characters!"],
      select: false,
    },
    phone:{
      type:Number,
      required:[true,"Please provide phone number!"]
    },
    role:{
      type:String,
      required:[true,"Please select a role"],
      enum: ["Job Seeker", "Employer"],

    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
 
);

module.exports = mongoose.model("UserInfo", UserModal);