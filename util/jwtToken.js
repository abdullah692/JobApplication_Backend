// Function to send token in the response
const sendToken = (user, statusCode, res, message) => {
    // Generate the token using the user's method
    
    const token = user.getJWTtoken();
    console.log("TOKEN",token);
  
    // Send the token in the JSON response
    res.status(statusCode).json({
      success: true,
      // user,
      message,
      token, // Token included in the response
    });
  };


 module.exports= sendToken;