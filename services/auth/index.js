const { createCodeDao, removeCodeDao } = require("../../dao/code");
const {verifyEmailDao, createUserDao, loginDao, getUserDao, logoutDao } = require("../../dao/user");
const { createUserToConfirmDao, userByIdDao, updateUserDao } = require("../../dao/userToConfirm");
const { encrypt, compare } = require("../../helpers/handleBcrypt");
const { handleError } = require("../../helpers/handleError");
const { tokenLoginSign } = require("../../helpers/handleJwt");
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
        const hashPassword=await encrypt(password);
        const result=await createUserToConfirmDao(email,hashPassword,username,name,response.code._id);
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
        console.log("error ",err);
        return handleError(err,"Ha ocurrido un error en la capa de servicios",500);
    }
}
const loginService=async(email,password)=>{
    try{
        const response=await getUserDao(email);
        if(response.error)return handleError(response.error,response.message,response.status);
        const isValid=await compare(password,response.user.password);
        if(!isValid)return handleError(true,"Contraseña inválida",400);
        const token=await tokenLoginSign(response.user);
        const result=await loginDao(response.user._id);
        if(result.error)return handleError(response.error,response.message,response.status);
        return{
            message:result.message,
            token
        }
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de servicios",500);
    }
}
const sendCodeService=async(userId)=>{
    try{
        const code=generateCode();
        const response=await createCodeDao(code);
        if(response.error)return handleError(response.error,response.message,response.status);
        const result=await updateUserDao(response.code._id,userId);
        if(result.error) return handleError(result.error,result.message,result.status);
        const info=await sendEmail(response.code.codeVerification,result.email);
        if(info.error)return handleError(info.error,info.message,info.status);

        return{
            message:result.message,
            code:result.code,
            user:result.user
        }
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de servicios",500);
    }
}
const logoutService=async(id)=>{
    try{
        const response=await logoutDao(id);
        if(response.error) return handleError(response.error,response.message,response.status);
        return{
            message:response.message
        }
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de servicios",500);
    }
}
module.exports={logoutService,sendCodeService,loginService,registerService,userByIdService,confirmAccountService}