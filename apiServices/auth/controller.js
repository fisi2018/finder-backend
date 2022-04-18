const { httpError, handleError } = require("../../helpers/handleError");
const { registerService, userByIdService, confirmAccountService } = require("../../services/auth");

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
            code:response.code,
            user:response.user
        })
    }catch(err){
        httpError(res,err);
    }
}
exports.confirmAccount=async(req,res)=>{
    try{
        const user=req.user;
        const {codeId,code}=req.body;
        const result=await confirmAccountService(user,codeId,code);
        if(result.error)return res.status(result.status).send({message:result.message,error:result.error});
        return res.status(202).send({
            message:result.message
        });
    }catch(err){
        httpError(res,err);
    }
}
exports.userById=async(req,res,next,id)=>{
    try{
        const response=await userByIdService(id);
        if(response.error)return res.status(response.status).send({message:response.message,error:response.error});
        req.user=response.user;
        next();
    }catch(err){
        httpError(res,err);
    }
}