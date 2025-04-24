const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength:4
  },
  lastName: {
    type: String,
  },
  age: {
    type: Number,
    min:18 // number me min/max hota hai 
    
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    trim:true
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String, // custom validator functions. 
    validate(value){
        if(!['male','female','others'].includes(value)){
            throw new Error("Gender data is not valid");
        }

    }

  },
  photoUrl: {
    type: String,
    default:"https://www.ihna.edu.au/blog/wp-content/uploads/2022/10/user-dummy.png"
  },
  about: {
    type:String,
    default:"This is the default about of the User"
  },
  skills: {
    type:[String],
  },
},{timestamps:true});

const User = mongoose.model("User", userSchema);
module.exports = User;
