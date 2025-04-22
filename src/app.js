// create server 

const express = require('express');

const app = express() // this is the instace of an express js application. 

// whatever reqest is coming in. it is responding the same way it is. 
//but if u give route then it will give outcome only on that route eg:Test.

app.use('/test',(req,res)=>{
    res.send("I am going to test the app")
}) // this route will match all the http method API Call to /test.

app.get("/user",(req,res)=>{
    res.send({
        firstname:"Ayush",
        lastname:"Gupta"
    })
}) // this will only handle get call to user. 

app.post("/user",(req,res)=>{
    console.log("Save data to the database");
    res.send("Data is saved");
})

app.delete("/user",(req,res)=>{
    res.send("User Deleted Succussfully")
})












//you are creating a webserver , u have to listen to the upcoming request.
app.listen(3000,()=>{
    console.log("Server is successfully running on port 3000");
}) // curson is waiting and listening on the server. 



