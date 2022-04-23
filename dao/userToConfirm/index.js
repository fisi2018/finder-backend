const { handleError } = require("../../helpers/handleError")
const UserToConfirmModel=require("../../apiServices/userToConfirm/model");
const createUserToConfirmDao=async(email,password,username,name,code)=>{
    try{
        const userToConfirm=await UserToConfirmModel.create({email,password,username,name,code});
        const result=await userToConfirm.save();
        return{
            message:"Cuenta por confirmar creada exitosamente",
            user:result
        }
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de datos",500);
    }
}
const userByIdDao=async(id)=>{
    try{
        const user=await UserToConfirmModel.findById(id).populate("code");
        console.log("byid ",user);
        if(!user)return handleError("NotFound","Usuario no encontrado",404);
        return{
            message:"Usuario encontrado exitosamente",
            user
        }
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de datos",500);
    }
}
const updateUserDao=async(code,id)=>{
    try{
        const response=await UserToConfirmModel.findByIdAndUpdate(id,{code},{new:true});
        if(!response) return handleError(true,"Usuario no encontrado",404);
        return{
            message:"Código enviado exitosamente",
            code:response.code,
            user:response._id,
            email:response.email
        }
    }catch(err){
        console.log("error ",err);
        return handleError(err,"Ha ocurrido un error en la capa de datos",500);
    }
}
module.exports={updateUserDao,createUserToConfirmDao,userByIdDao}