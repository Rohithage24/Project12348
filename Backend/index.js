import express from "express";
import server from "./app.js";
import mongoose from "mongoose";
import  mongodb  from "./config/mongodb.js";
const port = process.env.PORT || 6000;


// server.get("/",(req, res)=>{
//   return res.send("Hello...")  
// })

console.log(port);
server.listen(port , ()=>{
    mongodb()
    console.log(`Server is Start PORT : ${port}`);
    
})