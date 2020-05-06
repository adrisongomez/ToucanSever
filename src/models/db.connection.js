const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/toucandb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connection was succesfully");
    module.exports = mongoose;
  })
  .catch((err) => {
    console.log("MongoDB connection fails");
    throw err;
  });
