import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";

const app =express()
dotenv.config();

const connect =async ()=>{
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongodb")
    }catch(error){
        throw error;
    }

}

mongoose.connection.on("disconnected" ,()=>{
    console.log("mongoDB disconnected!");
})

//middlewares
app.use(cookieParser())
app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/hotels",hotelsRoute);
app.use("/api/rooms",roomsRoute);

app.listen(2000,()=>{
    connect()
    console.log("app is listening at port 2000")
})