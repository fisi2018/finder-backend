const express=require("express");
const route=express.Router();

const {showPlaces,createPlace,updatePlace}=require("./controller");

route.get("/places",showPlaces);
route.post("/createPlace",createPlace);
route.put("/updatePlace",updatePlace);

module.exports=route;