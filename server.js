const express = require("express");
const dbConnection=require('./config/dbConnects')
const cors=require('cors');
const validateToken = require("./middleware/validateToken");


const app = express();

const dotenv = require("dotenv").config();
dbConnection();
const port = process.env.PORT || 5001;

const corsOptions = {
  origin: ['http://localhost:3000',"http://localhost:5173"] , // Update to your front-end's origin
  credentials: true // Allow credentials (cookies, etc.)
};


app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   console.log(req.body);
// })

app.use('/api/users',require('./routes/usersRoutes'))
app.use("/api", validateToken);
app.use('/api',require('./routes/contactsRouter'))


app.listen(port, () => {
  console.log(`Port is listnening to  ${port}`);
});
