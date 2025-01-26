const UserInfo = require("../modals/userModal");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const catchAsyncErrors = require('../middleware/catchAsyncnErrors')
const { ErrorHandler } = require("../middleware/Error");
const sendToken = require("../util/jwtToken")


//GET Request:Get Registered Users
const getUsers = async (req, res) => {
  const users = await UserInfo.find();
  if (users.length != 0) {

    res.status(200).json({ message: "Users is found", users })
  }
  else {
    res.status(200).json({ success: true, message: "No users were registered" })

  }
};

//POST Request:Register User

const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, phone, role } = req.body;
  if (!name || !email || !password || !phone || !role) {
    return next(new ErrorHandler("Kindly fill the form correctly!!", 400))
  }
  if (password.length < 6 || password.length > 32) {
    return next(
      new ErrorHandler("Password must be between 6 and 32 characters!", 400)
    );
  }
  const isEmail = await UserInfo.findOne({ email });
  console.log("isEMial", isEmail);
  if (isEmail) {
    return next(new ErrorHandler("User already registered!!", 400))
  }
  const bycryptPass = await bycrypt.hash(password, 5);
  const user = await UserInfo.create({
    name, email, password: bycryptPass, phone, role
  })
  if (user) {
    sendToken(user, 200, res, "User is Registered Succussfully")
  }
})

//POST Request:Login User
const postLogin = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide the credentials", 400))
  }
  const user = await UserInfo.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid credentials entered", 400))
  }
  const isPaswordMatch = await bycrypt.compare(password, user.password)
  if (!isPaswordMatch) {
    return next(new ErrorHandler("Invalid credentials entered", 400))
  }
  if (user.role != role) {
    next(new ErrorHandler(`User with provided email and role not found!`, 404))
  }
  sendToken(user, 200, res, "User is LoggedIn Successfully!!")
})

//POST Request:Login User
// const postLogin = async (req, res) => {
//   const { email, password } = req.body;
//   try {

//     if (!email || !password) {
//       res.status(400).json({ message: "Please provide all data" });
//     } else {
//       const isUserExists = await UserModal.findOne({ email });
//       if (
//         isUserExists &&
//         (await bycrypt.compare(password, isUserExists.password))
//       ) {
//         const accessToken = jwt.sign(
//           {
//             user: {
//               username: isUserExists.username,
//               email: isUserExists.email,
//               id: isUserExists.id,
//             },
//           },
//           process.env.ACCESS_TOKEN,
//           { expiresIn: "24hr" }
//         );
//         console.log(accessToken);
//         if (accessToken) {
//           res.status(200).json({
//             success: true,
//             message: "Logged In Successfully",
//             accessToken,
//             user: isUserExists.username
//           });
//         }
//       } else {
//         res
//           .json({ success: false, message: "Crendentials are not valid" });
//       }
//     }
//   } catch (error) {
//     return res.status(500).json({ message: "Internel Server Error", error });
//   }
// };

const currentUser = async (req, res) => {
  const user = req.user;
  res.status(200).json({ message: "Current user is available",
    success: true,
    user,
   },
    
  );
};

module.exports = {
  getUsers,
  registerUser,
  postLogin,
  currentUser
};
