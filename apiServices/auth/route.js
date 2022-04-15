const express=require("express");
const route=express.Router();

const {login,register,confirmAccount} =require("./controller");

route.post("/login",login);
route.post("/register",register);
route.put("/confirmAccount",confirmAccount);

module.exports=route;