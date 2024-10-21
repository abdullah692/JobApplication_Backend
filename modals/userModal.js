const mongoose = require("mongoose");

const UserModal = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is Required"],
    },
    email: {
      type: String,
      required: [true, "User email is required"],
    },
    password: {
      type: String,
      required: [true, "User Password is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserInfo", UserModal);
