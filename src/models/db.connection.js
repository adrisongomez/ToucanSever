const mongoose = require("mongoose");

mongoose
  .connect(`${process.env.MONGODB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDB connection was succesfully");
    module.exports = mongoose;
  })
  .catch((err) => {
    console.log("MongoDB connection fails");
    throw err;
  });
