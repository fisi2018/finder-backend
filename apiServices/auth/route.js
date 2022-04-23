const express=require("express");
const { validateRegister, validateCode,validateLogin } = require("../../middlewares/validator");
const route=express.Router();
const {login,register,confirmAccount,userById} =require("./controller");

route.post("/login",validateLogin,login);
route.post("/register",validateRegister,register);
route.put("/confirmAccount/:userId",confirmAccount);

route.param("userId",validateCode,userById);
module.exports=route;