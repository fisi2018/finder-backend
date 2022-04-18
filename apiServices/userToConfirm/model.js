const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema;
const userToConfirmSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        maxlength:32,
        unique:true,
        match:/^(\w+[/./-]?){1,}@[a-z]+([/.]\w{2,}|([/.]\w{2,})+[/.]\w{2,})$/,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    username:{//@marco2065
        type:String,
        required:true,
        unique:true,
        maxlength:32,
        trim:true
    },
    name:{//Marco Fura
        type:String,
        maxlength:32,
        match:/^[a-z A-ZáéíóúñÑ,.'´-]+$/,
        trim:true,
        default:""
    },
    expiredTime:{
        type:Date,
        expires:1800,
        default:Date.now()
    },
    code:{
        type:ObjectId,
        unique:true,
        required:true,
        ref:"CodeModel"
    }
},{
    versionKey:false,
    timestamps:true
});
module.exports=mongoose.model("UserToConfirmModel",userToConfirmSchema);