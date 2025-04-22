// create server
const express = require("express");
const { adminAuth,userAuth } = require("./middlewares/auth");
const app = express();



// handle auth middleware for all request handlers
app.use("/admin", adminAuth);


app.get("/user", userAuth, (req, res, next) => {
  res.send("user data send");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("All data sent");
});

app.get("/admin/deleteAllData", (req, res) => {
  const token = "xyzh";
  const isAdminAuth = token === "xyz";

  if (isAdminAuth) {
    res.send("delete the user data");
  } else {
    res.status(401).send("admin not Authorised"); // to avoid repitition middleware come into the picture.
  }
});

// we should check the auth of the admin . should i check the auth of admin everywhere.
// validate the token.

app.listen(3000, () => {
  console.log("Server is successfully running on port 3000");
}); // curson is waiting and listening on the server.
