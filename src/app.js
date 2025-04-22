// create server

const express = require("express");

const app = express();

app.use(
  "/user",
  (req, res, next) => {
    console.log("Handling the route");
    next();
    //res.send("response 1"); // send the response at this point , it will not go any further
  },
  (req, res,next) => {
    console.log("Handling the route 2");
    //res.send("Response 2");
    next()
  },
  (req, res,next) => {
    console.log("Handling the route 3");
    //res.send("Response 3");
    next()
  },
  (req, res,next) => {
    console.log("Handling the route 4");
    res.send("Response 4");
  }


);

// if u are using next and res both it will throw an error that u cant send the res twice.

//you are creating a webserver , u have to listen to the upcoming request.
app.listen(3000, () => {
  console.log("Server is successfully running on port 3000");
}); // curson is waiting and listening on the server.
