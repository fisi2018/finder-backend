const app=require("./app");
const connectionDB=require("./config/connectionDB");
require("dotenv").config();
const PORT=process.env.PORT || 4000;

app.listen(PORT,async()=>{
    await connectionDB();
    console.log("Conectado por el puerto ",PORT);
})