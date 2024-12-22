const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  console.log(req.headers,"headers");

  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1];
    console.log("tokenaa",token);
    

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log(err, "err:validateToken");
        return res.status(406).send({
          success: false,
          message: "Token is expired or invalid",
        });
      }
console.log("decoded.user",decoded.user);
console.log("decoded",decoded);

      req.user = decoded; // Attach decoded user to the request object
      next(); // Proceed to the next middleware/controller
    });
  } else {
    return res.status(401).send({
      success: false,
      message: "Authorization token missing or malformed",
    });
  }
};

module.exports = validateToken;
