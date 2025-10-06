const express=require("express") 
const dotenv=require("dotenv")

dotenv.config()
const app=express() 

const port=process.env.PORT

app.get("/api/auth/signup",(req,res)=>{
    res.send("Signup Endpoint")
})

app.get("/api/auth/login",(req,res)=>{
    res.send("Login Endpoint")
})

app.get("/api/auth/logout",(req,res)=>{
    res.send("Logout Endpoint")
})


app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})