const { httpError} = require("../../helpers/handleError");
const { loginService,registerService, userByIdService, confirmAccountService, sendCodeService, logoutService } = require("../../services/auth");

exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const response=await loginService(email,password);
        if(response.error)return res.status(response.error).send({message:response.message,error:response.error});
        return res.status(202).send({
            message:response.message,
            token:response.token
        });
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
        console.log("userbyid ",id);
        const response=await userByIdService(id);
        if(response.error)return res.status(response.status).send({message:response.message,error:response.error});
        req.user=response.user;
        next();
    }catch(err){
        httpError(res,err);
    }
}
exports.sendCode=async(req,res)=>{
    try{
        const {userId}=req.body;
        const response=await sendCodeService(userId);
        if(response.error)return res.status(response.status).send({message:response.message,error:response.error});
        res.status(200).send({
            message:response.message,
            code:response.code,
            user:response.user
        })
    }catch(err){
        httpError(res,err);
    }
}
exports.testing=(req,res)=>{
    const user=req.user;
    res.send({
        message:`Hola ${req.body.nombre}`,
        user
    })
}
exports.logout=async(req,res)=>{
    try{
        const response=await logoutService(req.user._id);
        if(response.error)return res.status(response.error).send({message:response.message,error:response.error});
        res.status(202).send({
            message:response.message
        })
    }catch(err){
        httpError(res,err);
    }
}