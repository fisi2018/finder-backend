const { createUserDao } = require("../../dao/user");
const { handleError } = require("../../helpers/handleError");
const generateCode = require("../../utils/generateCode");
const generateUsername = require("../../utils/generateUsername");

const registerService=async(fields)=>{
    try{
        const {email,password,name}=fields;
        const codeVerification=generateCode();
        //send code to email
        const username=generateUsername(email);
        const result=await createUserDao(email,password,name,username,codeVerification);
        
        if(result.error) return handleError(result.error,result.message,result.status);
        return{
            message:result.message
        }
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de servicios",500);
    }
}
module.exports={registerService}