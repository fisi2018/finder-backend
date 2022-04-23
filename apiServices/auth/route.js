const express=require("express");
const checkAuth = require("../../middlewares/auth");
const checkRoleAuth = require("../../middlewares/roleAuth");
const { validateRegister, validateCode,validateLogin } = require("../../middlewares/validator");
const route=express.Router();
const {login,logout,sendCode,register,confirmAccount,userById,testing} =require("./controller");

route.post("/login",validateLogin,login);
route.post("/register",validateRegister,register);
route.post("/sendCode",sendCode);
route.post("/logout",checkAuth,checkRoleAuth(["user","premium"]),logout);
route.put("/confirmAccount/:userId",validateCode,confirmAccount);
route.post("/test",checkAuth,checkRoleAuth(["user","premium"]),testing);

route.param("userId",userById);
module.exports=route;