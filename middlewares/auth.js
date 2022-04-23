const {verifyToken}=require("../helpers/handleJwt");

const checkAuth=async(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ").pop();
        const data=await verifyToken(token);
        data._id?next():res.status(401).send({message:"No se encuentra logeado",error:true})
    }catch(err){
        res.status(409).send({
            message:"No tiene acceso",
            error:true
        })
    }
}
module.exports=checkAuth