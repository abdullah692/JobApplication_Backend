const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      "DATABASE IS CONNECTED",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.log("Error Message", error);
    process.exit(1);
  }
};

module.exports = dbConnection;
