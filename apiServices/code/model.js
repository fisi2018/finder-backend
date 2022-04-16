const mongoose=require("mongoose");
const codeSchema=new mongoose.Schema({
    codeVerification:{
        type:String,
        unique:true,
        length:6,
        required:true,
        trim:true
    },
    expiredTime:{
        type:Date,
        expires:360,
        default:Date.now()
    }
},{
    versionKey:false,
    timestamps:true
});
module.exports=mongoose.model("CodeModel",codeSchema);