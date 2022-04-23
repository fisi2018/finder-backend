const jwt=require("jsonwebtoken");

const tokenLoginSign=async(user)=>{
    const {_id,role,email,username,name}=user;
    console.log("secret key ",process.env.JWT_SECRET);
    return jwt.sign({
        _id,
        role,
        email,
        username,
        name
    },
    process.env.JWT_SECRET
    ,{
        expiresIn:"1h"
    })
}
const verifyToken=async(token)=>{
    try{
        return jwt.verify(token,process.env.JWT_SECRET);
    }catch(err){
        return null
    }
}
module.exports={verifyToken,tokenLoginSign}