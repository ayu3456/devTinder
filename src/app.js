// create server 

const express = require('express');

const app = express() // this is the instace of an express js application. 

app.use("/",(req,res)=>{
    res.send("Hello Ayush")
}) 

// whatever reqest is coming in. it is responding the same way it is. 
//but if u give route then it will give outcome only on that route eg:Test.

app.use('/test',(req,res)=>{
    res.send("I am going to test the app")
})


//you are creating a webserver , u have to listen to the upcoming request.
app.listen(3000,()=>{
    console.log("Server is successfully running on port 3000");
}) // curson is waiting and listening on the server. 



