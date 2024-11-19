const UserModal = require("../modals/userModal");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//GET Request:Get Registered Users
const getUsers = async (req, res) => {
  // const users = await UserModal.find();
  // res.status(200).json({ message: "Registered users is found", users });

  const users=await UserModal.find();
  console.log(users,"users");
  
  if(users.length != 0)
  {

    res.status(200).json({message : "Users is found",users})
  }
  else{
    res.status(200).json({message : "No users were registered"})

  }
};

//POST Request:Register User
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send({ message: "Please fill the form..!!" });
    } else {
      const isExists = await UserModal.findOne({ email });
      if (isExists) {
        return res.status(201).json({ message: "User is already exists" });
      }
      const bycryptPass = await bycrypt.hash(password, 10);
      const createUser = await UserModal.create({
        username,
        email,
        password: bycryptPass,
      });
      if (createUser) {
        return res
          .status(200)
          .json({ message: "User is Registered Succussfully" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Internel Server Error", error });
  }
};


//POST Request:Login User
const postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    
    if (!email || !password) {
      res.status(400).json({ message: "Please provide all data" });
    } else {
      const isUserExists = await UserModal.findOne({ email });
      if (
        isUserExists &&
        (await bycrypt.compare(password, isUserExists.password))
      ) {
        const accessToken = jwt.sign(
          {
            user: {
              username: isUserExists.username,
              email: isUserExists.email,
              id: isUserExists.id,
            },
          },
          process.env.ACCESS_TOKEN,
          { expiresIn: "24hr" }
        );
        console.log(accessToken);
        if (accessToken) {
          res.status(200).json({
            success: true,
            message: "Logged In Successfully",
            accessToken,
            user:isUserExists.username
          });
        }
      } else {
        res
          .json({ success: false, message: "Crendentials are not valid" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Internel Server Error", error });
  }
};
 
const currentUser = async (req, res) => {
    res.status(200).json({ message: "Current user is available" });
  };

module.exports = {
  getUsers,
  registerUser,
  postLogin,
  currentUser
};
