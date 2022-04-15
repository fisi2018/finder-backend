const httpError=(res,error)=>{
    console.log("error ",error);
    return res.status(500).send({
        message:"Ha ocurrido un error",
        error
    })
}
const handleError=(error,message,status)=>{
    return{
        error,
        message,
        status
    }
}
module.exports={httpError,handleError};