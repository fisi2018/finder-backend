const { handleError } = require("../../helpers/handleError")
const UserModel=require("../../apiServices/user/model");
const createUserDao=async(email,password,name,username)=>{
    try{
        await UserModel.create({email,password,name,username});
        return{
            message:"Usuario registrado exitosamente",
            status:201
        }
    }catch(err){
        console.log("error al crear el user ",err);
        let error={
            email:err.errors.email.kind==="regexp"?"Email inválido":false,
            name:err.errors.name.kind==="regexp"?"Nombre inválido":false
        }
        return handleError(error,"Ha ocurrido un error en la capa de datos",500);
    }
}
const verifyEmailDao=async(email)=>{
    try{
        const result=await UserModel.findOne({email});
        if(!result) return {message:"Email disponible"};
        if(result.status==="ToConfirm") return handleError(result.status,"Cuenta por confirmar",503);
        if(result.status==="Offline" || result.status==="Online") return handleError(result.status,"Email ya registrado",503)
    }catch(err){
        console.log("error catch verify ",err," tipo ",typeof err);
        return handleError(err,"Ha ocurrido un error en la capa de datos",500);
    }
}
module.exports={createUserDao,verifyEmailDao}