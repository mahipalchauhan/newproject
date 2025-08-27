import mongoose,{Schema, schema, Types} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const videoSchema=new Schema( 
     {
   videoFile:{
    Type:String,  //cloudinary url
    require:true,
   },
   thumbnail:{
    type:String,
    require:true
   },
    title:{
    type:String,
    require:true
   },

   description:{
    type:String,
    require:true,
   },
  duration:{
    type:Number, // claudinary
    require:true,
   },
  
   views:{
    type:Number,
    default:0
  },

  isPublished:{
    type:Boolean,
    default:true,
  },
  owner:{
     type:Schema.Types.ObjectId,
     ref:"User",
    }
   
    },
       {timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate)
    
export const Video=videoSchema.model('Video',videoSchema)
