const { handleError } = require("../../helpers/handleError")
const UserModel=require("../../apiServices/user/model");
const UserToConfirmModel=require("../../apiServices/userToConfirm/model");
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
        const response=await UserToConfirmModel.findOne({email});
        if(!result && !response) return {message:"Email disponible"};
        if(result)return handleError("EmailOcupado","Email ya registrado",503);
        if(response)return handleError("EmailToConfirm","Email por confirmar",503);
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de datos",500);
    }
}
module.exports={createUserDao,verifyEmailDao}