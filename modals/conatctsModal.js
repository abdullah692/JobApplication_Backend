const mongoose = require("mongoose");

const contactModal = mongoose.Schema(
  {
    user_id:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:'UserInfo',
  },
    name: {
      type: String,
      required: [true, "Please enter the Contact Name"],
    },
    email: {
      type: String,
      required: [true, "Please enter the Contact Email"],
    },
    address: {
      type: String,
      required: [true, "Enter Contacts address"],
    },
    phone: {
      type: String,
      required: [true, "Enter contact number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contacts", contactModal);
