import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user_model.js"
import {uploadonCLoudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler ( async (req,res) =>{
   //get user detail
   //validation - not empty
   //check if user already exist:user,email
   // check images and avatar
   //upload to claudinary  ,avatar
   // create user object - create entry_in db
   //remove password and refresh token filed from response
   // check user creation 
   //return response

    const {fullname,email,username,password} =req.body
    console.log("email",email);
      
    if(
        [fullname,email,username,password].some((field)=>field?.trim() ==="")
    ){
        throw new ApiError(400,"ALL fields are required");
    }

const existedUser = User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"user with email or username exist already");
    }

   const avatarLocalPath= req.files?.avatar[0]?.path;
    console.log(req.body);
    const coverImageLocalPath=req.files?.coverImage[0]?.path;
   if(!avatarLocalPath){
    throw new ApiError(400,"reqiure avatar file");
   }

  const avatar=await uploadonCLoudinary(avatarLocalPath)
 const coverImage=await uploadonCLoudinary(coverImageLocalPath);
  
 if(!avatar){
    throw new ApiError(400,"Avatar file required")
 }

const user=await User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase(),

}) 

const createdUser=await User.findById(user._id).select(
    "-password -refreshToken"
);

if(!createdUser){
 throw new ApiError(500,"something wrong while user register");
}

return res.status(201).json(
    new ApiResponse(200,createdUser,"user register succesfully")
)

})

export {registerUser,}