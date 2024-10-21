const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  let token;
  console.log(req.headers);
  let authHeader = req.headers.Authorization || req.headers.authorization;
  console.log(authHeader, "authHeader:validateToken");
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        console.log(err, "err:validateToken");
         return res.status(406).send({
          success: false,
          message: "Token is expired",
        });
      }

      // console.log(decoded,'vvvvvvvvvvvvvvvvvvvvvvvvvvv');
      req.user=decoded.user;
      next();
    //   console.log(req.user,'aaaaaaaaaaaaaaaaaaaaaaaa');
    });
  }
};

module.exports = validateToken;
