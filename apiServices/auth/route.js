const express=require("express");
const { validateRegister } = require("../../middlewares/validator");
const route=express.Router();
const {login,register,confirmAccount} =require("./controller");

route.post("/login",login);
route.post("/register",validateRegister,register);
route.put("/confirmAccount",confirmAccount);

module.exports=route;