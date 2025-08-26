//require('dotenv').config({path:'./env'})
import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

import connectDB from "./db/index.js";
const app=express()

dotenv.config({
path:'./env'
})

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}
))

app.use(express.json({ limit:"20kb"}))
app.use(express.urlencoded({extended:true,limit:"20kb"}))
app.use(express.static("public"))
app.use(cookieParser())


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is running at port :${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("mongo db fail!!");
})

/*
;(async ()=>{
    try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)        
   app.on("error",(error)=>{
    console.log("ERROR",error);
    throw error
   })

   app.listen(process.env.PORT,()=>{
    console.log(`app is listening ${process.env.PORT}`);
   })

} catch (error) {
        console.error("error",error)
        throw err
    }
})() */