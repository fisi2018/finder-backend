const { createCodeDao, removeCodeDao } = require("../../dao/code");
const {verifyEmailDao, createUserDao } = require("../../dao/user");
const { createUserToConfirmDao, userByIdDao } = require("../../dao/userToConfirm");
const { handleError } = require("../../helpers/handleError");
const generateCode = require("../../utils/generateCode");
const generateUsername = require("../../utils/generateUsername");
const { sendEmail } = require("../mailer");

const registerService=async(fields)=>{
    try{
        const {email,password,name}=fields;
        const exist=await verifyEmailDao(email);
        if(exist.error) return handleError(exist.error,exist.message,exist.status);
        const codeVerification=generateCode();
        const info=await sendEmail(codeVerification,email);
        if(info.error) return handleError(info.error,info.message,info.status);
        const response=await createCodeDao(codeVerification);
        console.log("code ",response);
        if(response.error) return handleError(response.error,response.message,response.status);
        const username=generateUsername(email);
        const result=await createUserToConfirmDao(email,password,username,name,response.code._id);
        if(result.error) return handleError(result.error,result.message,result.status);
        
        return{
            message:result.message,
            code:response.code._id,
            user:result.user._id
        }
    }catch(err){
        console.log("catch service ",err);
        return handleError(err,"Ha ocurrido un error en la capa de servicios",500);
    }
}
const userByIdService=async(id)=>{
    try{
        const result=await userByIdDao(id);
        if(result.error) return handleError(result.error,result.message,result.status);
        return{
            message:result.message,
            user:result.user
        }
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de servicios",500);
    }
}
const confirmAccountService=async(user,codeId,code)=>{
    try{
        if(user.code.codeVerification===code){
            const result=await removeCodeDao(codeId);
            if(result.error)return handleError(result.error,result.message,result.status);
            const response=await createUserDao(user.email,user.password,user.name,user.username);
            if(response.error)return handleError(response.error,response.message,response.status);
            await user.remove();
            return{
                message:"Cuenta confirmada exitosamente"
            }
        }else{
            return handleError("BadRequest","Credenciales incorrectas",400)
        }
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de servicios",500);
    }
}
module.exports={registerService,userByIdService,confirmAccountService}