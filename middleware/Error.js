//Parent calss :Error
//Child Class : ErrorHandler

class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode
  }
}

const errorMiddleware = (err, req, res, next) => {

  //err is a builtin functions of mongoose
  //Set the defaults values of message and statusCode
  err.message = err.message || "Internel server error"
  err.statusCode = err.statusCode || 500;

  if (err.name == " Cast Error") {
    const message = `Resource not found. Invalid ${err.path}`,
      //reassgining the error to ERR so it shows me the constructir message 
      err = new ErrorHandler(message, 400);
  }

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`,
      err = new ErrorHandler(message, 400);
  }
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again!`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is expired, Try again!`;
    err = new ErrorHandler(message, 400);
  }


  // return the statusCode and the message which is customised with constructor
  return res.status(err.statusCode).json({
    success: false,
    message: err.message
  })
}
module.exports = { ErrorHandler, errorMiddleware };