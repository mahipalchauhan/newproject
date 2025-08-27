
import { request } from "express";
import  Mongoose ,{Schema, Types  } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const UserSchema=new Schema(
    {
  username:{
    Type:String,
    require:true,
    unique:true,
    lowercase:true,
    trim:true,
    index:true
  },
  email:{
      Type:String,
    require:true,
    unique:true,
    lowercase:true,
    trim:true,
  },
  fullname:{
      Type:String,
    require:true,
    trim:true,
    index:true,
  },
   avatar:{
      Type:String,  //cloudinary
    require:true,
  },
  coverImage:{
       Type:String,  //cloudinary
    require:true,
  },
  watchHistory:{
   type:Schema.Types.ObjectId,
   ref:"Video"
  },
  password:{
    type:String,
    require:[true,"pasword please!"]  
   },

   refreshToken:{
    type:String,
   } 
  
},{timeStamps:true})

UserSchema.pre("save", async function  (next){
if(!this.isModified("password")) return next();

  this.password=bcrypt.hash(this.password,10),
next()

})

UserSchema.methods.isPasswordCorrect=async function(password){
 return await bcrypt.compare(password,this.password)
 
}

//jwt is a bearer tokens 
UserSchema.methods.generateAccessToken=function(){
 return jwt.sign(
    {
      _id:this._id,
      email:this.email,
      username:this.username,
      fullname:this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
    }
  )
}

UserSchema.methods.generateRefreshToken=function(){
 return jwt.sign(
    {
      _id:this._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY,

    }
  )
}


export const User=UserSchema.model("User",UserSchema)
