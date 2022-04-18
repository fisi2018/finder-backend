const { handleError } = require("../../helpers/handleError");
const CodeModel=require("../../apiServices/code/model");
const createCodeDao=async(code)=>{
    try{
        const codeVerification=await CodeModel.create({codeVerification:code});
        console.log("antes del save ", codeVerification );
        const result= await codeVerification.save();
        console.log("desps del save ",result);
        return {
            message:"Código generado exitosamente",
            code:result
        }
    }catch(err){
        console.log("error en el code ",err);
        return handleError(err,"Ha ocurrido un error en la capa de datos",500);
    }
};
const removeCodeDao=async(id)=>{
    try{
        const result=await CodeModel.findByIdAndRemove(id);
        if(!result) return handleError("NotFound","Código no encontrado",404);
        return{
            message:"Código removido exitosamente"
        }
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de datos",500);
    }
}

module.exports={createCodeDao,removeCodeDao}