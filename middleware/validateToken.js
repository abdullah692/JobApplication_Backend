const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({
        success: false,
        message: "Authorization token missing or malformed",
      });
    }

    const token = authHeader.split(" ")[1];
    console.log("token:", token);

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log(err, "err:validateToken");
        return res.status(406).send({
          success: false,
          message: "Token is expired or invalid",
        });
      }

      console.log("decoded", decoded);

      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Server error in token validation",
    });
  }
};
module.exports = validateToken;
