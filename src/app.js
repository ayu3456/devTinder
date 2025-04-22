// create server

const express = require("express");

const app = express();

// get /users => middleware chain => request handler 

app.get("/user", (req, res, next) => {
  console.log("Handling the route");
  next();
  res.send("response 1"); // send the response at this point , it will not go any further
});

app.get("/user", (req, res, next) => {
  console.log("Handling the route user2");
  res.send("2nd route handler"); // this works exactly the same way
}); // the functions u put in btw are called middlewares.

// if u are using next and res both it will throw an error that u cant send the res twice.

//you are creating a webserver , u have to listen to the upcoming request.
app.listen(3000, () => {
  console.log("Server is successfully running on port 3000");
}); // curson is waiting and listening on the server.
