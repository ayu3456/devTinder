const mongoose = require("mongoose");
const validator = require("validator");

const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
    },
    lastName: {
      type: String,
    },
    age: {
      type: Number,
      min: 18, // number me min/max hota hai
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,

      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email Address" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Invalid Password" + value);
        }
      },
    },
    gender: {
      type: String, // custom validator functions.
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,

      default:
        "https://www.ihna.edu.au/blog/wp-content/uploads/2022/10/user-dummy.png",

      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo URL");
        }
      },
    },
    about: {
      type: String,
      default: "This is the default about of the User",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function (){

  const user = this;
  const token = await jwt.sign({_id:user._id},"ayush",{expiresIn:"1d"})
  return token;
}





const User = mongoose.model("User", userSchema);
module.exports = User;
