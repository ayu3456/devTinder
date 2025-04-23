// create server
const express = require("express");
const connectdb = require("./config/database");
const User = require("./models/user");
const app = express();

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "virat",
    lastName: "kohli",
    emailId: "virat@gmail.com",
    password: "virat@123",
  };

  // Creating a new Instance of the user model
  const user = new User(userObj);

  try {
    await user.save(); // this return us a promise
    res.send("user added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving the user:" + err.message);
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
