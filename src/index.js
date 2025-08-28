//require('dotenv').config({path:'./env'})
import dotenv from "dotenv"
import {app} from "./app.js"

import connectDB from "./db/index.js";


dotenv.config({
path:'./env'
})


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


    