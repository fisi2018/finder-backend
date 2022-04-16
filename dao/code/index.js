const { handleError } = require("../../helpers/handleError");
const CodeModel=require("../../apiServices/code/model");
const createCodeDao=async(code)=>{
    try{
        const codeVerification=await CodeModel.create({codeVerification:code});
         const result= await codeVerification.save();
        return {
            message:"Código generado exitosamente",
            code:result._id
        }
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de datos",500);
    }
}

module.exports={createCodeDao}