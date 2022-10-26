import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv"
import userRoute from "./routes/user.js"
import authRoute from "./routes/auth.js"
dotenv.config()

const app=express() 
app.use(express.json())

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
 
// MongoDB Connection Code 


mongoose.connect(process.env.MongoURL).then(()=>
 console.log("DB is connected successfully..")
).catch((err)=> console.log("Error while connecing with database..", err))

// Route Part 
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)


app.listen(5000,()=>{ 
  console.log("Server is running at 5000") 
})   