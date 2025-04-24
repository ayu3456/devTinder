// create server
const express = require("express");
const connectdb = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json()); // it will activated for all the routes  It read the req and convert into a js object.

app.post("/signup", async (req, res) => {
  //console.log(req.body);

  const userObj = req.body;

  // Creating a new Instance of the user model
  const user = new User(userObj);

  try {
    await user.save(); // this return us a promise
    res.send("User added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving the User:" + err.message);
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

  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {returnDocument:"after"});
   // const user = await User.findByIdAndUpdate(userId, data); you can do this too. 
    // console.log(user) // sahi aa raha output.


    res.send("Updated Succuessfully");
  } catch (error) {
    console.error("update nahi hua");
    res.send("update nahi hua");
  }
});



connectdb()
  .then(() => {
    console.log("Database connected Successfully");
    app.listen(3000, () => {
      console.log("Server is successfully running on port 3000");
    });
  })
  .catch((err) => console.error("Database cannot be connected"));
