const mongoose=require("mongoose");
const placeSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            trim:true,
            maxlength:32,
            required:true
        },
        description:{
            type:String,
            trim:true
        },
        address:{
            type:String,
            trim:true,
            required:true
        },
        location:{
            type:String,
            trim:true,
            required:true
        }
    },
    {timestamps:true,
    versionKey:false});
    module.exports=mongoose.model("PlaceModel",placeSchema);