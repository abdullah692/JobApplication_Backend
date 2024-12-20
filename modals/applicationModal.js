const mongoose=require("mongoose")
const validator=require("validator")

const applicationModal = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Name!"],
    minLength: [3, "Name must contain at least 3 Characters!"],
    maxLength: [30, "Name cannot exceed 30 Characters!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your Email!"],
    validate: [validator.isEmail, "Please provide a valid Email!"],
  },
  coverLetter: {
    type: String,
    required: [true, "Please provide a cover letter!"],
  },
  phone: {
    type: Number,
    required: [true, "Please enter your Phone Number!"],
  },
  address: {
    type: String,
    required: [true, "Please enter your Address!"],
  },
  resume: {
    path: {
      type: String, // Stores the file path or filename
      required: true,
  },
  filename: {
      type: String, // Stores the original file name
      required: true,
  },
  },
  // applicantID: {
  //   user: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "UserInfo",
  //     required: false,
  //   },
  //   role: {
  //     type: String,
  //     enum: ["Job Seeker"],
  //     required: false,
  //   },
  // },
  // employerID: {
  //   user: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "UserInfo",
  //     required: false,
  //   },
  //   role: {
  //     type: String,
  //     enum: ["Employer"],
  //     required: false,
  //   },
  // },
});

module.exports = mongoose.model("Application", applicationModal);
