const jwt = require("jsonwebtoken");
const User = require("../models/user");


const userAuth = async (req, res, next) => {
  // read the token from the req
  try {
    const cookies = req.cookies;
    const { token } = cookies;

    if (!token) {
      throw new Error("Token is not Valid!!!!!");
    }

    const decodedObj = await jwt.verify(token, "ayush");

    const { _id } = decodedObj;

    //console.log(_id);

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }

    //console.log(user);
    req.user = user
    next();
    // validate the token
  } catch (err) {
    res.status(500).send("Invalid Crediantial" + err.message);
  }
  // find the user
};

module.exports = { userAuth };
