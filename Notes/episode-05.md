# middlewares and routes handlers 

you can write as many route handler with next keyword and but at the end u should return some respond out of it. 

next should be called every time u go into next function. 
u can wrap it inside the array. 

app.use("/route",rh1,rh2,rh3,rh4)
app.use("/route",[rh1,rh2],rh3,rh4)  ye bhi valid hai.  


there route handlers in the middle are called middleware . 
but why middleware are needed ? 

try catch AND  error handling done. 
throw new Error ('kdnksndksnkn')










