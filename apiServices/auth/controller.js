const { httpError } = require("../../helpers/handleError");
const { registerService } = require("../../services/auth");

exports.login=async(req,res)=>{
    try{
        
    }catch(err){
        httpError(res,err);
    }
}
exports.register=async(req,res)=>{
    try{
        const fields=req.body;
        const response=await registerService(fields);
        if(response.error)return res.status(response.status).send({message:response.message,error:response.error});
        return res.status(201).send({
            message:response.message,
            code:response.code
        })
    }catch(err){
        httpError(res,err);
    }
}
exports.confirmAccount=async(req,res)=>{
    try{

    }catch(err){
        httpError(res,err);
    }
}