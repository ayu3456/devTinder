// create server
const express = require("express");
const app = express();

app.get("/getUserData", (req, res) => {
  try {
    // Logic of DB Call and get some user data agar error hai to try - catch block ka use karte hai
    throw new Error("Kuch kam nahi ho raha");

    res.send("User data sent");
  } catch (err) {
    res.status(500).send("Fir se fat gaya");
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    //log error

    res.status(500).send("Error aa gaya bro!");
  }
});

app.listen(3000, () => {
  console.log("Server is successfully running on port 3000");
});
