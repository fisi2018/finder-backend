const { handleError } = require("../../helpers/handleError")
const UserModel=require("../../apiServices/user/model");
const createUserDao=async(email,password,name,username,codeVerification)=>{
    try{
        await UserModel.create({email,password,name,username,verificationCode:{code:codeVerification}});
        return{
            message:"Usuario registrado exitosamente",
            status:201
        }
    }catch(err){
        console.log("error al crear el user ",err);
        return handleError(err,"Ha ocurrido un error en la capa de datos",500);
    }
}
module.exports={createUserDao}