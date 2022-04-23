const { verifyToken } = require("../helpers/handleJwt");
const UserModel=require("../apiServices/user/model");
const checkRoleAuth=(roles)=>async(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ").pop();
        const data=await verifyToken(token);
        const user=await UserModel.findById(data._id);
        console.log("user ",user);
        if(user.status==="Offline"){
            return res.status(401).send({
                message:"Sesión caducada",
                error:true
            })
        }
        req.user=user;
        [].concat(roles).includes(user.role)?next():
        res.status(401).send({
            message:"No tienes permisos",
            error:true
        })
    }catch(err){
        res.status(409).send({
            message:"No tienes permisos",
            error:true
        })
    }
}
module.exports=checkRoleAuth