// create server
const express = require("express");
const connectdb = require("./config/database");
const User = require("./models/user");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { validateSignUpData } = require("./utils/validation");
const cookieParser = require("cookie-parser");

app.use(express.json()); // it will activated for all the routes  It read the req and convert into a js object.

app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    // validate the data.
    validateSignUpData(req);
    // Encrypt the password

    const { firstName, lastName, emailId, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10); // it will return a promise

    console.log(hashPassword);

    // store the user

    // Creating a new Instance of the user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
    });

    await user.save(); // this return us a promise
    res.status(200).send("User added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving the User:" + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    //console.log(user)

    if (!user) {
      throw new Error("Invalid Credintials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    //console.log(isPasswordValid);

    if (isPasswordValid) {
      // create a jwt token

      const token = await jwt.sign({ _id: user._id }, "ayush");
      //console.log(token)

      // Add the token to cookie and send the response back to user

      //
      res.cookie("token", token);

      res.send("Login Successful");
    } else {
      throw new Error("Invalid Credintials");
    }
  } catch (error) {
    res.status(500).send("Error:" + error.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const cookie = req.cookies;

    // see the cookie is sent by auth user or not. extract token from the cookie and validate

    const { token } = cookie;
    //validate the token
    if (!token) {
      throw new Error("Token is not valid");
    }

    const decodedMessage = await jwt.verify(token, "ayush"); // it gives u a decoded value

    const { _id } = decodedMessage;

    const user = await User.findById(_id);

    if (!user) {
      // res.status(400).send("No User found")
      throw new Error("User does not exist");
    }

    //console.log(token)

    res.send(user);
  } catch (e) {
    res.status(500).json("Error: " + e.message);
  }
});

// get user from email
app.get("/user", async (req, res) => {
  //console.log(req.body.email)
  const userEmail = req.body.emailId;
  try {
    const user = await User.find({ emailId: userEmail });

    if (user.length === 0) {
      res.status(400).send("User not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("Cannot get the req from the User");
  }
});

// Feed api /feed get all user from the database.

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    //console.log(users)
    if (users.length === 0) {
      res.status(400).send("users not found");
    } else {
      res.status(200).send(users);
    }
  } catch (error) {
    res.status(400).send("Cannot get the req from the User");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    await User.findByIdAndDelete(userId);

    res.send("user deleted successfully");
  } catch (error) {
    console.error("deleted nahi hua");
    res.send("deleted nahi hua");
  }
});

app.patch("/user", async (req, res) => {
  const data = req.body;
  const userId = req.body.userId;
  //console.log(data);

  try {
    const ALLOWED_UPDATES = [
      "photoUrl",
      "about",
      "gender",
      "age",
      "userId",
      "skills",
      "firstName",
    ];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    //console.log(isUpdateAllowed);

    if (!isUpdateAllowed) {
      throw new Error();
    }

    if (data.skills && data.skills.length > 10) {
      throw new Error("Skills can't be more than 10 ");
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    // const user = await User.findByIdAndUpdate(userId, data); you can do this too.
    //console.log(user) // sahi aa raha output.

    res.send("Updated Succuessfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Update Failed:" + err.message);
  }
});

connectdb()
  .then(() => {
    console.log("Database connected Successfully");
    app.listen(3000, () => {
      console.log("Server is successfully running on port 3000");
    });
  })
  .catch((err) => console.error("Database cannot be connected" + err.message));
