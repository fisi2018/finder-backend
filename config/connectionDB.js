const mongoose=require("mongoose");

const connectionDB=async()=>{
    try{
        const DB_URL=process.env.DB_URL;
        await mongoose.connect(DB_URL);
        console.log("Conectado a la Base de datos");
    }catch(err){
        console.log("Error ocurrido al conectarse a la DB ",err);
    }
}
module.exports=connectionDB