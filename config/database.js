const mongoose = require("mongoose");

const connectdb = async () => {
  await mongoose.connect(
    "mongodb+srv://ayushg23csai:ipoH2ruS0OZr5tPr@cluster0.sxxbubx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
};

module.exports = connectdb;

//first connect to tha database then start you app