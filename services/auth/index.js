const { createCodeDao } = require("../../dao/code");
const { createUserDao, verifyEmailDao } = require("../../dao/user");
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
        if(response.error) return handleError(response.error,response.message,response.status);
        const username=generateUsername(email);
        const result=await createUserDao(email,password,name,username);
        if(result.error) return handleError(result.error,result.message,result.status);
        
        return{
            message:result.message,
            code:response.code._id
        }
    }catch(err){
        console.log("catch service ",err);
        return handleError(err,"Ha ocurrido un error en la capa de servicios",500);
    }
}
module.exports={registerService}