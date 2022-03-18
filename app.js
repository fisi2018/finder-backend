const express=require("express");
const morgan=require("morgan");
const cors=require("cors");
const app=express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
//routes
app.use("/api/place",require("./apiServices/place/route"));
//app.use("/api/auth",require("./apiServices/auth/route"));

module.exports=app;
